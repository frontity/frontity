/* eslint-disable no-irregular-whitespace, jest/no-conditional-expect */

import { readdir, readFile } from "fs-extra";
import { resolve as resolvePath } from "path";
import execa from "execa";

// We need to set a high timeout because building the docker container and
// running `frontity create` takes a long time.
jest.setTimeout(180000);

test("in a container with git installed and configured & when a git repo already exists", async () => {
  await execa.command(
    `node dist/src/cli/index.js create --no-prompt --theme @frontity/mars-theme test-frontity-app`,
    { stdio: "inherit" }
  );

  const output = await readdir("test-frontity-app");
  expect(output).toMatchInlineSnapshot();

  // The .gitignore should be the same as the template file.
  const gitignore = await readFile("test-frontity-app/.gitignore", "utf8");
  expect(gitignore).toEqual(
    await readFile(resolvePath(__dirname, "../templates/gitignore-template"), {
      encoding: "utf8",
    })
  );
});
