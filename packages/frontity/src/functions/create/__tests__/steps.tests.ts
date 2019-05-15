import {
  normalizeOptions,
  ensureProjectDir,
  createPackageJson,
  createFrontitySettings,
  cloneStarterTheme,
  installDependencies,
  downloadFavicon,
  revertProgress
} from "../steps";
import * as utils from "../../../utils";
import * as fsExtra from "fs-extra";
import * as fetch from "node-fetch";
import * as childProcess from "child_process";
import * as tar from "tar";

jest.mock("../../../utils");
jest.mock("fs-extra");
jest.mock("node-fetch");
jest.mock("child_process");
jest.mock("tar");

const mockedUtils = utils as jest.Mocked<typeof utils>;
const mockedFsExtra = fsExtra as jest.Mocked<typeof fsExtra>;
const mockedFetch = fetch as jest.Mocked<typeof fetch>;
const mockedChildProcess = childProcess as jest.Mocked<typeof childProcess>;
const mockedTar = tar as jest.Mocked<typeof tar>;

describe("normalizeOptions", () => {
  beforeEach(() => {
    mockedUtils.isPackageNameValid.mockReset();
  });

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
    mockedUtils.isPackageNameValid.mockReturnValue(true);
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
    mockedUtils.isPackageNameValid.mockReturnValue(false);
    expect(() => normalizeOptions(defaultOptions, passedOptions)).toThrow(
      "The name of the package is not valid. Please enter a valid one (only letters and dashes)."
    );
  });
});

describe("ensureProjectDir", () => {
  beforeEach(() => {
    mockedFsExtra.ensureDir.mockReset();
    mockedFsExtra.readdir.mockReset();
    mockedFsExtra.pathExists.mockReset();
  });

  test("works when passing a non existent path", async () => {
    const path = "/path/to/project";
    mockedFsExtra.pathExists.mockImplementation(() => Promise.resolve(false));
    const dirExisted = await ensureProjectDir({ path });
    expect(dirExisted).toBe(false);
    expect(mockedFsExtra.pathExists.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.ensureDir.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.readdir).not.toHaveBeenCalled();
  });

  test("works when passing an existent path with an empty repo", async () => {
    const path = "/path/to/project";
    mockedFsExtra.readdir.mockResolvedValue([
      "README.md",
      ".git",
      ".gitignore",
      "LICENSE"
    ]);
    mockedFsExtra.pathExists.mockImplementation(() => Promise.resolve(true));
    const dirExisted = await ensureProjectDir({ path });
    expect(dirExisted).toBe(true);
    expect(mockedFsExtra.pathExists.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.readdir.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.ensureDir).not.toHaveBeenCalled();
  });

  test("throws when passing an non-empty path", async () => {
    const path = "/path/to/project";
    mockedFsExtra.pathExists.mockImplementation(() => Promise.resolve(true));
    mockedFsExtra.readdir.mockResolvedValue(["file-that-should-not-exist"]);
    await expect(ensureProjectDir({ path })).rejects.toThrow(
      "The directory passed to `create` function is not empty"
    );
  });
});

describe("createPackageJson", () => {
  beforeEach(() => {
    mockedFetch.default.mockReset();
    mockedFetch.default.mockResolvedValue({
      json: () => Promise.resolve({ "dist-tags": { latest: "1.0.0" } })
    } as any);
    mockedFsExtra.writeFile.mockReset();
  });

  test('works with a theme like "@frontity/mars-theme"', async () => {
    const options = {
      name: "random-name",
      theme: "@frontity/mars-theme",
      path: "/path/to/project"
    };
    await createPackageJson(options);
    expect(mockedFetch.default.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.writeFile.mock.calls).toMatchSnapshot();
  });

  test('works with a theme like "mars-theme"', async () => {
    const options = {
      name: "random-name",
      theme: "random-theme",
      path: "/path/to/project"
    };
    await createPackageJson(options);
    expect(mockedFetch.default.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.writeFile.mock.calls).toMatchSnapshot();
  });
});

describe("createFrontitySettings", () => {
  beforeEach(() => {
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
    expect(mockedFsExtra.readFile).toHaveBeenCalled();
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
    expect(mockedFsExtra.readFile).toHaveBeenCalled();
    expect(mockedFsExtra.writeFile.mock.calls).toMatchSnapshot();
  });
});

describe("cloneStarterTheme", () => {
  beforeEach(() => {
    mockedFsExtra.readFile.mockReset();
    mockedFsExtra.readFile.mockResolvedValueOnce(JSON.stringify({
      dependencies: {
        "@frontity/mars-theme": "./packages/mars-theme"
      }
    }) as any);
    mockedFsExtra.ensureDir.mockReset();
    mockedUtils.isPackageNameValid.mockReset();
    mockedFsExtra.readdir.mockReset();
    mockedFsExtra.readdir.mockResolvedValueOnce(["file.tgz"]);
    mockedFsExtra.remove.mockReset();
    mockedChildProcess.exec.mockReset();
    (mockedChildProcess as any).exec.mockImplementation(
      (_command: string, _options: object, resolve: Function) => {
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
    mockedUtils.isPackageNameValid.mockReturnValue(true);
    await cloneStarterTheme(options);
    expect(mockedFsExtra.readFile.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.ensureDir.mock.calls).toMatchSnapshot();
    expect(mockedUtils.isPackageNameValid.mock.calls).toMatchSnapshot();
    expect(mockedChildProcess.exec.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.readdir.mock.calls).toMatchSnapshot();
    expect(mockedTar.extract.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.remove.mock.calls).toMatchSnapshot();
  });

  test("throws if the theme name is not valid", async () => {
    const options = {
      path: "/path/to/project",
      theme: "@frontity/mars-theme"
    };
    mockedUtils.isPackageNameValid.mockReturnValue(false);
    await expect(cloneStarterTheme(options)).rejects.toThrow(
      "The name of the theme is not a valid npm package name."
    );
  });
});

describe("downloadFavicon", () => {
  beforeEach(() => {
    mockedFetch.default.mockReset();
    (mockedFetch as any).default.mockResolvedValue({
      body: {
        pipe: jest.fn()
      }
    });
    mockedFsExtra.createWriteStream.mockReset();
    (mockedFsExtra as any).createWriteStream.mockReturnValue({
      on: jest.fn((_event, callback) => callback())
    });
  });

  test("works as expected", async () => {
    const options = {
      path: "/path/to/project"
    };
    await downloadFavicon(options);
    expect(mockedFetch.default.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.createWriteStream.mock.calls).toMatchSnapshot();
  });
});

describe("installDependencies", () => {
  beforeEach(() => {
    mockedChildProcess.exec.mockReset();
    (mockedChildProcess as any).exec.mockImplementation(
      (_command: string, _options: object, resolve: Function) => {
        resolve();
      }
    );
  });

  test("works as expected", async () => {
    const options = {
      path: "/path/to/project"
    };
    await installDependencies(options);
    expect(mockedChildProcess.exec.mock.calls).toMatchSnapshot();
  });
});

describe("revertProgress", () => {
  beforeEach(() => {
    mockedFsExtra.readdir.mockReset();
    mockedFsExtra.remove.mockReset();
  });

  test("works if the project directory existed", async () => {
    const dirExisted = true;
    const options = {
      path: "/path/to/project"
    };
    mockedFsExtra.readdir.mockResolvedValue([
      "frontity.settings.js",
      "package.json",
      "packages",
      "favicon.ico",
      "node_modules",
      "package-lock.json"
    ]);
    await revertProgress(dirExisted, options);
    expect(mockedFsExtra.readdir.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.remove.mock.calls).toMatchSnapshot();
  });

  test("works if the project directory didn't exist", async () => {
    const dirExisted = false;
    const options = {
      path: "/path/to/project"
    };
    await revertProgress(dirExisted, options);
    expect(mockedFsExtra.remove.mock.calls).toMatchSnapshot();
  });
});
