import { readdir, readFile } from "fs-extra";
import { resolve as resolvePath, join } from "path";
import execa from "execa";
import tempy from "tempy";

beforeAll(async () => {
  // Initialize a test user needed for commits.
  await execa.command('git config --global user.email "user@frontity.com"', {
    stdio: "inherit",
    shell: true,
  });
  await execa.command('git config --global user.name "Test User"', {
    stdio: "inherit",
    shell: true,
  });
});

describe("npx frontity create", () => {
  const cliPath = join(process.cwd(), "dist/src/cli/index.js");

  it("should create the initial files", async () => {
    await tempy.directory.task(async (tempFolder) => {
      await execa.command(
        `cd ${tempFolder} && node ${cliPath} create --no-prompt --theme @frontity/mars-theme test-frontity-app`,
        { stdio: "inherit", shell: true }
      );

      expect(await readdir(join(tempFolder, "test-frontity-app")))
        .toMatchInlineSnapshot(`
        Array [
          ".git",
          ".gitignore",
          "README.md",
          "favicon.ico",
          "frontity.settings.js",
          "node_modules",
          "package-lock.json",
          "package.json",
          "packages",
        ]
      `);
    });
  });

  it("should add a .gitignore file", async () => {
    await tempy.directory.task(async (tempFolder) => {
      await execa.command(
        `cd ${tempFolder} && node ${cliPath} create --no-prompt --theme @frontity/mars-theme test-frontity-app`,
        { stdio: "inherit", shell: true }
      );

      // The .gitignore should be the same as the template file.
      const gitignore = await readFile(
        join(tempFolder, "test-frontity-app", ".gitignore"),
        "utf8"
      );
      const template = await readFile(
        resolvePath(__dirname, "../../templates/gitignore-template"),
        { encoding: "utf8" }
      );
      expect(gitignore).toEqual(template);
    });
  });
});
