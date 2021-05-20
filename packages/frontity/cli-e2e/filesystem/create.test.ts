import { readdir, readFile, remove } from "fs-extra";
import { resolve as resolvePath } from "path";
import execa from "execa";

describe("npx frontity create", () => {
  it("should create the initial files", async () => {
    try {
      await execa.command(
        `ts-node src/cli/index.ts create --no-prompt --theme @frontity/mars-theme test-frontity-app`,
        { stdio: "inherit" }
      );

      expect(await readdir("test-frontity-app")).toMatchInlineSnapshot(`
        Array [
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
    } finally {
      await remove("test-frontity-app");
    }
  });

  it("should add a .gitignore file even if inside a git repo", async () => {
    try {
      await execa.command(
        `ts-node src/cli/index.ts create --no-prompt --theme @frontity/mars-theme test-frontity-app`,
        { stdio: "inherit" }
      );

      // The .gitignore should be the same as the template file.
      const gitignore = await readFile("test-frontity-app/.gitignore", "utf8");
      const template = await readFile(
        resolvePath(__dirname, "../../templates/gitignore-template"),
        { encoding: "utf8" }
      );
      expect(gitignore).toEqual(template);
    } finally {
      await remove("test-frontity-app");
    }
  });
});
