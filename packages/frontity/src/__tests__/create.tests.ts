import create from "../commands/create";
import * as steps from "../steps";

jest.mock("../steps");

const mockedSteps = steps as jest.Mocked<typeof steps>;

describe("create", () => {
  beforeEach(() => {
    mockedSteps.normalizeOptions.mockReset();
    mockedSteps.normalizeOptions.mockImplementation(
      (_defaultOptions, passedOptions) => passedOptions
    );
    mockedSteps.ensureProjectDir.mockReset();
    mockedSteps.createPackageJson.mockReset();
    mockedSteps.createFrontitySettings.mockReset();
    mockedSteps.cloneStarterTheme.mockReset();
    mockedSteps.installDependencies.mockReset();
    mockedSteps.revertProgress.mockReset();
  });

  test("goes through all steps", async () => {
    const options = {
      name: "random-name",
      path: "/path/to/project"
    };
    await create(options);
    expect(mockedSteps.normalizeOptions.mock.calls[0][1]).toMatchSnapshot();
    expect(mockedSteps.ensureProjectDir.mock.calls).toMatchSnapshot();
    expect(mockedSteps.createPackageJson.mock.calls).toMatchSnapshot();
    expect(mockedSteps.createFrontitySettings.mock.calls).toMatchSnapshot();
    expect(mockedSteps.cloneStarterTheme.mock.calls).toMatchSnapshot();
    expect(mockedSteps.installDependencies.mock.calls).toMatchSnapshot();
  });

  test("works correctly when `options.typescript` is false", async () => {
    const options = {
      name: "random-name",
      path: "/path/to/project",
      typescript: false
    };
    await create(options);
    expect(mockedSteps.createFrontitySettings).toHaveBeenCalledWith(
      "js",
      options.name,
      options.path
    );
  });

  test("works correctly when `options.typescript` is true", async () => {
    const options = {
      name: "random-name",
      path: "/path/to/project",
      typescript: true
    };
    await create(options);
    expect(mockedSteps.createFrontitySettings).toHaveBeenCalledWith(
      "ts",
      options.name,
      options.path
    );
  });

  test("calls removeProgress on error with dirExisted=true", async () => {
    const options = {
      name: "random-name",
      path: "/path/to/project"
    };
    mockedSteps.ensureProjectDir.mockResolvedValueOnce(true);

    const error = new Error("Mocked Error");
    mockedSteps.createPackageJson.mockImplementation(() => {
      throw error;
    });

    const emitter = create(options);

    const spy = jest.fn();
    emitter.on("cli:create:error", spy);

    await emitter;

    expect(spy).toHaveBeenLastCalledWith(error);
    expect(mockedSteps.revertProgress).toHaveBeenCalledWith(true, options.path);
  });

  test("calls removeProgress on error with dirExisted=false", async () => {
    const options = {
      name: "random-name",
      path: "/path/to/project"
    };
    mockedSteps.ensureProjectDir.mockResolvedValueOnce(false);

    const error = new Error("Mocked Error");
    mockedSteps.createPackageJson.mockImplementation(() => {
      throw error;
    });

    const emitter = create(options);

    const spy = jest.fn();
    emitter.on("cli:create:error", spy);

    await emitter;

    expect(spy).toHaveBeenLastCalledWith(error);
    expect(mockedSteps.revertProgress).toHaveBeenCalledWith(
      false,
      options.path
    );
  });

  test("does not call removeProgress if ensureProjectDir throws error", async () => {
    const options = {
      name: "random-name",
      path: "/path/to/project"
    };

    const error = new Error("Mocked Error");
    mockedSteps.ensureProjectDir.mockImplementation(() => {
      throw error;
    });

    const emitter = create(options);

    const spy = jest.fn();
    emitter.on("cli:create:error", spy);

    await emitter;

    expect(spy).toHaveBeenLastCalledWith(error);
    expect(mockedSteps.revertProgress).not.toHaveBeenCalled();
  });

  test("uses the emitter passed to log messages", async () => {
    const emitter = { emit: jest.fn() };
    const options = {
      name: "random-name",
      path: "/path/to/project"
    };
    await create(options);
    expect(emitter.emit.mock.calls).toMatchSnapshot();
  });

  test("uses the emitter passed to log the errors", async () => {
    const emitter = { emit: jest.fn() };
    const options = {
      name: "random-name",
      path: "/path/to/project"
    };
    mockedSteps.ensureProjectDir.mockImplementation(() => {
      throw new Error("Mocked Error");
    });
    await create(options);
    expect(emitter.emit.mock.calls).toMatchSnapshot();
  });
});
