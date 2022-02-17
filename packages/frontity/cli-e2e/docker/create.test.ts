import execa from "execa";
import { readFile } from "fs-extra";
import { resolve as resolvePath } from "path";
import { testContainer } from "./utils";

beforeAll(async () => {
  if (process.env.CI) return;

  // Remove the dist output.
  await execa.command("rm -rf dist", { stdio: "inherit" });

  // Compile the TS source to JS.
  await execa.command("npm run build", { stdio: "inherit" });

  // Build the "base" docker image that contains our CLI.
  await execa.command("docker build -t frontity-cli .", { stdio: "inherit" });
});

afterAll(async () => {
  await execa.command("docker rmi frontity-cli");
});

describe("npx frontity create", () => {
  describe("typescript", () => {
    it("should create a new typescript project cloning @frontity/mars-theme-typescript", () =>
      testContainer(async ({ runCommand }) => {
        await runCommand(
          `node dist/src/cli/index.js create --no-prompt test-frontity-app --typescript`
        );
        const root = await runCommand("ls -a test-frontity-app");
        expect(root).toMatchInlineSnapshot(`
          ".
          ..
          README.md
          favicon.ico
          frontity.settings.ts
          node_modules
          package-lock.json
          package.json
          packages
          tsconfig.json"
        `);

        const pkgs = await runCommand("ls -a test-frontity-app/packages");
        expect(pkgs).toMatchInlineSnapshot(`
          ".
          ..
          mars-theme-typescript"
        `);
      }));
  });

  describe("git", () => {
    it("should not add git if git is installed but git settings are missing", () =>
      testContainer(async ({ runCommand }) => {
        await runCommand("apk add git");
        await runCommand(
          `node dist/src/cli/index.js create --no-prompt --theme @frontity/mars-theme test-frontity-app`,
          { stdio: "inherit" }
        );

        const output = await runCommand("ls -a test-frontity-app");

        expect(output).toEqual(expect.not.stringMatching(/\.git$/m));
        expect(output).toEqual(expect.not.stringMatching(/\.gitignore$/m));
      }));

    it("should not add git if git is not installed", () =>
      testContainer(async ({ runCommand }) => {
        await runCommand(
          `node dist/src/cli/index.js create --no-prompt --theme @frontity/mars-theme test-frontity-app`
        );

        const output = await runCommand("ls -a test-frontity-app");
        expect(output).toEqual(expect.not.stringMatching(/\.git$/m));
        expect(output).toEqual(expect.not.stringMatching(/\.gitignore$/m));
      }));

    it("should add git if git is installed and configured", () =>
      testContainer(async ({ runCommand }) => {
        await runCommand("apk add git");
        await runCommand('git config --global user.email "user@frontity.com"');
        await runCommand('git config --global user.name "Test User"');

        await runCommand(
          `node dist/src/cli/index.js create --no-prompt --theme @frontity/mars-theme test-frontity-app`,
          { stdio: "inherit" }
        );

        const output = await runCommand("ls -a test-frontity-app");
        expect(output).toEqual(expect.stringMatching(/\.git$/m));
        expect(output).toEqual(expect.stringMatching(/\.gitignore$/m));
      }));

    it("should add .gitignore when a git repo already exists", () =>
      testContainer(async ({ runCommand }) => {
        await runCommand("apk add git");
        await runCommand('git config --global user.email "user@frontity.com"');
        await runCommand('git config --global user.name "Test User"');
        await runCommand("git init test-frontity-app");

        await runCommand(
          `node dist/src/cli/index.js create --no-prompt --theme @frontity/mars-theme test-frontity-app`,
          { stdio: "inherit" }
        );

        const output = await runCommand("ls -a test-frontity-app");
        expect(output).toEqual(expect.stringMatching(/\.git$/m));
        expect(output).toEqual(expect.stringMatching(/\.gitignore$/m));

        // The .gitignore should be the same as the template file.
        const gitignore = await runCommand("cat test-frontity-app/.gitignore");
        const template = await readFile(
          resolvePath(__dirname, "../../templates/gitignore-template"),
          { encoding: "utf8" }
        );
        expect(gitignore).toEqual(template);
      }));

    it("should add .gitignore when a inside a parent git repo", () =>
      testContainer(async ({ runCommand }) => {
        await runCommand("apk add git");
        await runCommand('git config --global user.email "user@frontity.com"');
        await runCommand('git config --global user.name "Test User"');
        await runCommand("git init");

        await runCommand(
          `node dist/src/cli/index.js create --no-prompt --theme @frontity/mars-theme test-frontity-app`,
          { stdio: "inherit" }
        );

        const output = await runCommand("ls -a test-frontity-app");
        expect(output).toEqual(expect.not.stringMatching(/\.git$/m));
        expect(output).toEqual(expect.stringMatching(/\.gitignore$/m));

        // The .gitignore should be the same as the template file.
        const gitignore = await runCommand("cat test-frontity-app/.gitignore");
        const template = await readFile(
          resolvePath(__dirname, "../../templates/gitignore-template"),
          { encoding: "utf8" }
        );
        expect(gitignore).toEqual(template);
      }));

    it("should append to .gitignore when it already exist", () =>
      testContainer(async ({ runCommand }) => {
        await runCommand("apk add git");
        await runCommand('git config --global user.email "user@frontity.com"');
        await runCommand('git config --global user.name "Test User"');
        await runCommand("git init test-frontity-app");

        // Create the .gitignore
        await runCommand('echo "test" > test-frontity-app/.gitignore');

        let output = await runCommand("ls -a test-frontity-app");
        expect(output).toEqual(expect.stringMatching(/\.gitignore$/m));

        await runCommand(
          `node dist/src/cli/index.js create --no-prompt --theme @frontity/mars-theme test-frontity-app`,
          { stdio: "inherit" }
        );

        // The first line should be `test` because it was the original content of
        // the .gitignore file.
        output = await runCommand("cat test-frontity-app/.gitignore");
        expect(output).toMatchInlineSnapshot(`
                  "test
                  node_modules
                  build"
              `);
      }));
  });
});
