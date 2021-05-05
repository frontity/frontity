/* eslint-disable jest/no-try-expect, jest/no-conditional-expect */
import create from "../create";
import * as steps from "../../steps";
import * as utils from "../../utils";

jest.mock("../../steps");

const mockedSteps = steps as jest.Mocked<typeof steps>;

const mockedHasGit = jest.spyOn(utils, "hasGit");
const mockedIsInGitRepository = jest.spyOn(utils, "isInGitRepository");

describe("create", () => {
  beforeEach(() => {
    mockedSteps.normalizeOptions.mockReset();
    mockedSteps.normalizeOptions.mockImplementation(
      (_defaultOptions, passedOptions) => passedOptions
    );
    mockedSteps.ensureProjectDir.mockReset();
    mockedSteps.createPackageJson.mockReset();
    mockedSteps.createFrontitySettings.mockReset();
    mockedSteps.createTsConfig.mockReset();
    mockedSteps.cloneStarterTheme.mockReset();
    mockedSteps.installDependencies.mockReset();
    mockedSteps.initializeGit.mockReset();
    mockedSteps.createGitignore.mockReset();
    mockedSteps.revertProgress.mockReset();

    mockedHasGit.mockReset().mockReturnValue(true);
    mockedIsInGitRepository.mockReset().mockReturnValue(false);
  });

  test("goes through all steps", async () => {
    const options = {
      name: "random-name",
      path: "/path/to/project",
      theme: "@frontity/mars-theme",
      typescript: false,
    };
    await create(options);
    expect(mockedSteps.normalizeOptions.mock.calls[0][1]).toMatchSnapshot();
    expect(mockedSteps.ensureProjectDir.mock.calls).toMatchSnapshot();
    expect(mockedSteps.createPackageJson.mock.calls).toMatchSnapshot();
    expect(mockedSteps.createFrontitySettings.mock.calls).toMatchSnapshot();
    expect(mockedSteps.cloneStarterTheme.mock.calls).toMatchSnapshot();
    expect(mockedSteps.installDependencies.mock.calls).toMatchSnapshot();
    expect(mockedSteps.createGitignore.mock.calls).toMatchSnapshot();
    expect(mockedSteps.initializeGit.mock.calls).toMatchSnapshot();
  });

  test("works correctly when `options.typescript` is false", async () => {
    // Restore the original implementation
    const { normalizeOptions } = jest.requireActual("../../steps");
    mockedSteps.normalizeOptions.mockImplementation(normalizeOptions);

    const options = {
      name: "random-name",
      path: "/path/to/project",
      theme: "@frontity/mars-theme",
      typescript: false,
    };

    await create(options);

    expect(mockedSteps.createPackageJson).toHaveBeenCalledWith(
      options.name,
      options.theme,
      options.path,
      options.typescript
    );
    expect(mockedSteps.createFrontitySettings).toHaveBeenCalledWith(
      "js",
      options.name,
      options.path,
      "@frontity/mars-theme"
    );
  });

  test("works correctly when `options.typescript` is true", async () => {
    // Restore the original implementation
    const { normalizeOptions } = jest.requireActual("../../steps");
    mockedSteps.normalizeOptions.mockImplementation(normalizeOptions);

    const options = {
      name: "random-name",
      path: "/path/to/project",
      theme: "@frontity/mars-theme",
      typescript: true,
    };

    await create(options);

    expect(mockedSteps.createPackageJson).toHaveBeenCalledWith(
      options.name,
      options.theme,
      options.path,
      options.typescript
    );
    expect(mockedSteps.createFrontitySettings).toHaveBeenCalledWith(
      "ts",
      options.name,
      options.path,
      "@frontity/mars-theme"
    );
    expect(mockedSteps.createTsConfig).toHaveBeenCalledWith(options.path);
  });

  test("works correctly when `options.noGit` is true", async () => {
    const { normalizeOptions } = jest.requireActual("../../steps");
    mockedSteps.normalizeOptions.mockImplementation(normalizeOptions);

    const options = {
      name: "random-name",
      path: "/path/to/project",
      noGit: true,
    };

    await create(options);
    expect(mockedSteps.initializeGit).not.toHaveBeenCalled();
  });

  test("initializeGit is called with the path of the project", async () => {
    const { normalizeOptions } = jest.requireActual("../../steps");
    mockedSteps.normalizeOptions.mockImplementation(normalizeOptions);

    const options = {
      name: "random-name",
      path: "/path/to/project",
    };

    await create(options);
    expect(mockedSteps.initializeGit).toHaveBeenCalledWith(options.path);
  });

  test("initializeGit is NOT called if git is not installed", async () => {
    mockedHasGit.mockReturnValue(false);

    const { normalizeOptions } = jest.requireActual("../../steps");
    mockedSteps.normalizeOptions.mockImplementation(normalizeOptions);

    const options = {
      name: "random-name",
      path: "/path/to/project",
    };

    await create(options);
    expect(mockedSteps.initializeGit).not.toHaveBeenCalled();
    expect(mockedSteps.createGitignore).not.toHaveBeenCalled();
  });

  test("works correctly if we are in a git repository", async () => {
    mockedIsInGitRepository.mockReturnValue(true);

    const { normalizeOptions } = jest.requireActual("../../steps");
    mockedSteps.normalizeOptions.mockImplementation(normalizeOptions);

    const options = {
      name: "random-name",
      path: "/path/to/project",
    };

    await create(options);

    // If we are already in a git repo, we don't want to call initializeGit
    expect(mockedSteps.initializeGit).not.toHaveBeenCalled();
    expect(mockedSteps.createGitignore).toHaveBeenCalledWith(options.path);
  });

  test("calls removeProgress on error with dirExisted=true", async () => {
    const options = {
      name: "random-name",
      path: "/path/to/project",
    };
    mockedSteps.ensureProjectDir.mockResolvedValueOnce(true);

    try {
      const error = new Error("Mocked Error");
      mockedSteps.createPackageJson.mockImplementation(() => {
        throw error;
      });

      await create(options);
    } catch (err) {
      expect(err.message).toBe("Mocked Error");
      expect(mockedSteps.revertProgress).toHaveBeenCalledWith(
        true,
        options.path
      );
    }
  });

  test("calls removeProgress on error with dirExisted=false", async () => {
    const options = {
      name: "random-name",
      path: "/path/to/project",
    };
    mockedSteps.ensureProjectDir.mockResolvedValueOnce(false);

    try {
      const error = new Error("Mocked Error");
      mockedSteps.createPackageJson.mockImplementation(() => {
        throw error;
      });

      await create(options);
      throw new Error("This should not be reached");
    } catch (err) {
      expect(err.message).toBe("Mocked Error");
      expect(mockedSteps.revertProgress).toHaveBeenCalledWith(
        false,
        options.path
      );
    }
  });

  test("does not call removeProgress if ensureProjectDir throws error", async () => {
    const options = {
      name: "random-name",
      path: "/path/to/project",
    };

    try {
      const error = new Error("Mocked Error");
      mockedSteps.ensureProjectDir.mockImplementation(async () => {
        throw error;
      });

      await create(options);
      throw new Error("This should never be reached");
    } catch (err) {
      expect(err.message).toBe("Mocked Error");
      expect(mockedSteps.revertProgress).not.toHaveBeenCalled();
    }
  });

  test("uses the emitter passed to log messages", async () => {
    const emitter = { emit: jest.fn() };
    const options = {
      name: "random-name",
      path: "/path/to/project",
    };
    await create(options);
    expect(emitter.emit.mock.calls).toMatchSnapshot();
  });

  test("Bubbling up the error", async () => {
    const options = {
      name: "random-name",
      path: "/path/to/project",
    };

    try {
      const error = new Error("Mocked Error");
      mockedSteps.ensureProjectDir.mockImplementation(async () => {
        throw error;
      });

      await create(options);
    } catch (err) {
      expect(err.message).toBe("Mocked Error");
    }
  });

  test("If no theme is specified, clone the default", async () => {
    const options = {
      name: "random-name",
      path: "/path/to/project",
    };

    // Restore the original implementation
    const { normalizeOptions } = jest.requireActual("../../steps");
    mockedSteps.normalizeOptions.mockImplementation(normalizeOptions);

    mockedSteps.ensureProjectDir.mockResolvedValueOnce(false);

    await create(options);

    expect(mockedSteps.cloneStarterTheme).toHaveBeenCalledTimes(1);
    expect(mockedSteps.cloneStarterTheme).toHaveBeenCalledWith(
      "@frontity/mars-theme",
      options.path
    );
  });

  test("Clone the specified theme", async () => {
    const options = {
      name: "random-name",
      path: "/path/to/project",
      theme: "@frontity/twentytwenty-theme",
    };

    await create(options);

    expect(mockedSteps.cloneStarterTheme).toHaveBeenCalledTimes(1);
    expect(mockedSteps.cloneStarterTheme).toHaveBeenCalledWith(
      options.theme,
      options.path
    );
  });
});
