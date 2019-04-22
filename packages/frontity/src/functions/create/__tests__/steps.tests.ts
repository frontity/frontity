import {
  normalizeOptions,
  ensureProjectDir,
  createPackageJson
} from "../steps";
import * as fsExtra from "fs-extra";
import * as phin from "phin";

jest.mock("fs-extra");
jest.mock("phin");

const mockedFsExtra = fsExtra as jest.Mocked<typeof fsExtra>;
const mockedPhin = phin as jest.Mocked<typeof phin>;
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
    await ensureProjectDir({ path });
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
    await ensureProjectDir({ path });
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
      packages: ["frontity", "@frontity/file-settings"],
      theme: "@frontity/mars-theme"
    };
    await createPackageJson(options);
    expect(mockedPhin.default.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.writeFile.mock.calls).toMatchSnapshot();
  });

  test('works with a theme like "mars-theme"', async () => {
    const options = {
      name: "random-name",
      packages: ["frontity", "@frontity/file-settings"],
      theme: "random-theme"
    };
    await createPackageJson(options);
    expect(mockedPhin.default.mock.calls).toMatchSnapshot();
    expect(mockedFsExtra.writeFile.mock.calls).toMatchSnapshot();
  });
});

describe("createFrontitySettings", () => {});

describe("cloneStarterTheme", () => {});

describe("installDependencies", () => {});

describe("revertProgress", () => {});
