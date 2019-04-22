import { normalizeOptions } from "../steps";

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

describe("ensureProjectDir", () => {});

describe("createPackageJson", () => {});

describe("createFrontitySettings", () => {});

describe("cloneStarterTheme", () => {});

describe("installDependencies", () => {});

describe("revertProgress", () => {});
