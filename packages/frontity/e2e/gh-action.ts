/* eslint-disable no-irregular-whitespace, jest/no-conditional-expect */

import { readFile } from "fs-extra";
import { resolve as resolvePath } from "path";
import execa from "execa";

// We need to set a high timeout because building the docker container and
// running `frontity create` takes a long time.
jest.setTimeout(180000);

/**
 * A helper to run CLI commands.
 *
 * @param cmd - The command to run.
 * @returns The stdout of the command.
 */
const runCommand = async (cmd: string) => {
  const { stdout } = await execa.command(cmd, {
    stdio: "pipe",
  });
  return stdout;
};

test("in a container with git installed and configured & when a git repo already exists", async () => {
  await execa.command(
    `node dist/src/cli/index.js create --no-prompt --theme @frontity/mars-theme test-frontity-app`,
    { stdio: "inherit" }
  );

  let output: string;

  if (process.platform === "win32") {
    output = await runCommand("dir /a:hd test-frontity-app");
    expect(output).toMatchInlineSnapshot();
  } else {
    output = await runCommand("ls -a test-frontity-app");
    expect(output).toMatchInlineSnapshot();
  }

  let command: string;
  if (process.platform === "win32") {
    command = "type test-frontity-app/.gitignore";
  } else {
    command = "cat test-frontity-app/.gitignore";
  }

  // The .gitignore should be the same as the template file.
  const gitignore = await runCommand(command);
  expect(gitignore).toEqual(
    await readFile(resolvePath(__dirname, "../templates/gitignore-template"), {
      encoding: "utf8",
    })
  );
});
