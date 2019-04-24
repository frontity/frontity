import {
  normalizeOptions,
  ensureProjectDir,
  createPackageJson,
  createFrontitySettings,
  cloneStarterTheme,
  installDependencies,
  revertProgress
} from "../steps";
import * as fsExtra from "fs-extra";
import * as phin from "phin";
import * as childProcess from "child_process";
import * as tar from "tar";

jest.mock("fs-extra");
jest.mock("phin");
jest.mock("child_process");
jest.mock("tar");

const mockedFsExtra = fsExtra as jest.Mocked<typeof fsExtra>;
const mockedPhin = phin as jest.Mocked<typeof phin>;
const mockedChildProcess = childProcess as jest.Mocked<typeof childProcess>;
const mockedTar = tar as jest.Mocked<typeof tar>;
const mockedChDir = jest.fn();
process.chdir = mockedChDir;

describe("normalizeOptions", () => {
  test("returns merged options", () => {
    const defaultOptions = {
      path: "/default/path/to/project",
      typescript: false,
      packages: ["frontity", "@frontity/file-settings"],
      theme: "@frontity/mars-theme"
    };
    const passedOptions = {
      name: "Some Random Name",
      path: "/path/to/project",
      theme: "@frontity/saturn-theme"
    };
    const expectedOptions = {
      name: "some-random-name",
      path: passedOptions.path,
      typescript: defaultOptions.typescript,
      packages: defaultOptions.packages,
      theme: passedOptions.theme
    };
    const result = normalizeOptions(defaultOptions, passedOptions);
    expect(result).toEqual(expectedOptions);
  });

  test("throws if `options.name` is not valid", () => {
    const defaultOptions = {
      path: "/default/path/to/project",
      typescript: false,
      packages: ["frontity", "@frontity/file-settings"],
      theme: "@frontity/mars-theme"
    };
    const passedOptions = {
      name: "Some, Random Name"
    };
    expect(() => normalizeOptions(defaultOptions, passedOptions)).toThrow(
      "The name of the package is not valid. Please enter a valid one (only letters and dashes)."
    );
  });
});

describe("ensureProjectDir", () => {
  beforeEach(() => {
    mockedChDir.mockReset();
    mockedFsExtra.ensureDir.mockReset();
    mockedFsExtra.readdir.mockReset();
  });

  test("works when passing a non existent path", async () => {
    const path = "/path/to/project";
    mockedFsExtra.readdir.mockResolvedValue([]);
    const dirExisted = await ensureProjectDir({ path });
    expect(dirExisted).toBe(false);
    expect(mockedFsExtra.ensureDir.mock.calls).toMatchSnapshot();
    expect(mockedChDir.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.readdir.mock.calls).toMatchSnapshot();
  });

  test("works when passing an existent path with an empty repo", async () => {
    const path = "/path/to/project";
    mockedFsExtra.readdir.mockResolvedValue([
      "README.md",
      ".git",
      ".gitignore",
      "LICENSE"
    ]);
    const dirExisted = await ensureProjectDir({ path });
    expect(dirExisted).toBe(true);
    expect(mockedFsExtra.ensureDir.mock.calls).toMatchSnapshot();
    expect(mockedChDir.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.readdir.mock.calls).toMatchSnapshot();
  });

  test("throws when passing an non-empty path", async () => {
    const path = "/path/to/project";
    mockedFsExtra.readdir.mockResolvedValue(["file-that-should-not-exist"]);
    await expect(ensureProjectDir({ path })).rejects.toThrow(
      "The directory passed to `create` function is not empty"
    );
  });
});

describe("createPackageJson", () => {
  beforeEach(() => {
    mockedChDir.mockReset();
    mockedPhin.default.mockReset();
    mockedPhin.default.mockResolvedValueOnce({
      body: { "dist-tags": { latest: "1.0.0" } }
    } as any);
    mockedPhin.default.mockResolvedValueOnce({
      body: { "dist-tags": { latest: "0.1.1" } }
    } as any);
    mockedFsExtra.writeFile.mockReset();
  });

  test('works with a theme like "@frontity/mars-theme"', async () => {
    const options = {
      name: "random-name",
      packages: ["@frontity/wp-source"],
      theme: "@frontity/mars-theme"
    };
    await createPackageJson(options);
    expect(mockedPhin.default.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.writeFile.mock.calls).toMatchSnapshot();
  });

  test('works with a theme like "mars-theme"', async () => {
    const options = {
      name: "random-name",
      packages: ["@frontity/wp-source"],
      theme: "random-theme"
    };
    await createPackageJson(options);
    expect(mockedPhin.default.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.writeFile.mock.calls).toMatchSnapshot();
  });
});

describe("createFrontitySettings", () => {
  beforeEach(() => {
    mockedChDir.mockReset();
    mockedFsExtra.readFile.mockReset();
    mockedFsExtra.readFile.mockResolvedValueOnce("$settings$" as any);
    mockedFsExtra.writeFile.mockReset();
  });

  test("works when extension is `js`", async () => {
    const options = {
      name: "random-name",
      path: "/path/to/project",
      packages: ["frontity", "@frontity/file-settings"]
    };
    const extension = "js";
    await createFrontitySettings(extension, options);
    expect(mockedChDir.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.readFile.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.writeFile.mock.calls).toMatchSnapshot();
  });

  test("works when extension is `ts`", async () => {
    const options = {
      name: "random-name",
      path: "/path/to/project",
      packages: ["frontity", "@frontity/file-settings"]
    };
    const extension = "ts";
    await createFrontitySettings(extension, options);
    expect(mockedChDir.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.readFile.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.writeFile.mock.calls).toMatchSnapshot();
  });
});

describe("cloneStarterTheme", () => {
  beforeEach(() => {
    mockedChDir.mockReset();
    mockedFsExtra.readFile.mockReset();
    mockedFsExtra.readFile.mockResolvedValueOnce(JSON.stringify({
      dependencies: {
        "@frontity/mars-theme": "./packages/mars-theme"
      }
    }) as any);
    mockedFsExtra.ensureDir.mockReset();
    mockedFsExtra.readdir.mockReset();
    mockedFsExtra.readdir.mockResolvedValueOnce(["file.tgz"]);
    mockedFsExtra.remove.mockReset();
    mockedChildProcess.exec.mockReset();
    (mockedChildProcess as any).exec.mockImplementation(
      (_command: string, resolve: Function) => {
        resolve();
      }
    );
    mockedTar.extract.mockReset();
  });

  test("works as expected", async () => {
    const options = {
      path: "/path/to/project",
      theme: "@frontity/mars-theme"
    };
    await cloneStarterTheme(options);
    expect(mockedChDir.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.readFile.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.ensureDir.mock.calls).toMatchSnapshot();
    expect(mockedChildProcess.exec.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.readdir.mock.calls).toMatchSnapshot();
    expect(mockedTar.extract.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.remove.mock.calls).toMatchSnapshot();
  });
});

describe("installDependencies", () => {
  beforeEach(() => {
    mockedChDir.mockReset();
    mockedChildProcess.exec.mockReset();
    (mockedChildProcess as any).exec.mockImplementation(
      (_command: string, resolve: Function) => {
        resolve();
      }
    );
  });

  test("works as expected", async () => {
    const options = {
      path: "/path/to/project"
    };
    await installDependencies(options);
    expect(mockedChDir.mock.calls).toMatchSnapshot();
    expect(mockedChildProcess.exec.mock.calls).toMatchSnapshot();
  });
});

describe("revertProgress", () => {
  beforeEach(() => {
    mockedChDir.mockReset();
    mockedFsExtra.remove.mockReset();
  });

  test("works if the project directory existed", async () => {
    const dirExisted = true;
    const options = {
      path: "/path/to/project"
    };
    await revertProgress(dirExisted, options);
    expect(mockedChDir.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.remove.mock.calls).toMatchSnapshot();
  });

  test("works if the project directory didn't exist", async () => {
    const dirExisted = false;
    const options = {
      path: "/path/to/project"
    };
    await revertProgress(dirExisted, options);
    expect(mockedChDir.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.remove.mock.calls).toMatchSnapshot();
  });
});
