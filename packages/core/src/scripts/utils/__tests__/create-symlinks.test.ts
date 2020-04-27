import mock from "mock-fs";
import createSymlinks from "../create-symlinks";
import { lstat, realpathSync } from "fs";
import { tmpdir } from "os";
import { promisify } from "util";

const lstatPromise = promisify(lstat);

afterEach(() => {
  // We need to restore the mock, otherwise it breaks jest
  //github.com/tschaub/mock-fs#example
  mock.restore();
});

test("check symlinks", async () => {
  // We pretend that we're running the command in some project directory, but really we just get an absolute path to a temp directory
  const projectDir = realpathSync(tmpdir());

  // The createSymLinks step is using the CWD to determine the running dir, so we're "mocking" it
  process.env.CWD = projectDir;

  mock({
    [`${projectDir}/package.json`]: `{
          "name": "someDep",
          "dependencies": {
            "someDep": "./packages/someDep"
          }
        }`,
    [`${projectDir}/packages/someDep`]: {
      "package.json": `{ name: "someDep" }`,
    },
  });

  await createSymlinks();

  const stats = await lstatPromise("./node_modules/someDep");
  expect(stats.isSymbolicLink()).toBe(true);
});
