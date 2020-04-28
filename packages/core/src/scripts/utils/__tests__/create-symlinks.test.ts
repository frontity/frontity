import mock from "mock-fs";
import createSymlinks from "../create-symlinks";
import { lstat, realpathSync } from "fs";
import { tmpdir } from "os";
import { promisify } from "util";

// We pretend that we're running the command in some project directory, but really we just get an absolute path to a temp directory
const lstatPromise = promisify(lstat);
const projectDir = realpathSync(tmpdir());

afterEach(() => {
  // We need to restore the mock, otherwise it breaks jest
  //github.com/tschaub/mock-fs#example
  mock.restore();
});

beforeEach(() => {
  // The createSymLinks step is using the CWD to determine the running dir, so we're "mocking" it
  process.env.CWD = projectDir;
});

describe("Create Symlink", () => {
  test("should create symlink if path is valid and exist", async () => {
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

  test("should create symlink if package path is prefixed with file:", async () => {
    mock({
      [`${projectDir}/package.json`]: `{
          "name": "someDep",
          "dependencies": {
            "dep-with-file": "file:./packages/dep-with-file"
          }
        }`,
      [`${projectDir}/packages/dep-with-file`]: {
        "package.json": `{ name: "dep-with-file" }`,
      },
    });

    await createSymlinks();

    const stats = await lstatPromise("./node_modules/dep-with-file");
    expect(stats.isSymbolicLink()).toBe(true);
  });

  test("should throw error if package does not exist", async () => {
    const packageName = "dep-with-file";

    mock({
      [`${projectDir}/package.json`]: `{
        "name": "someDep",
        "dependencies": {
          "${packageName}": "file:./packages/${packageName}"
        }
      }`,
    });

    await expect(createSymlinks()).rejects.toThrow(
      `${projectDir}/packages/${packageName} for ${packageName} does not exist.`
    );
  });

  test("should throw error if path is not a valid packaged", async () => {
    const packageName = "dep-with-file";

    mock({
      [`${projectDir}/package.json`]: `{
        "name": "someDep",
        "dependencies": {
          "${packageName}": "file:./packages/${packageName}"
        }
      }`,
      [`${projectDir}/packages/${packageName}`]: {},
    });

    await expect(createSymlinks()).rejects.toThrow(
      `${packageName} is not a valid node package.`
    );
  });
});
