import build from "../cli/build";
import * as utils from "../utils";
import * as buildCmd from "../commands/build";
import { EventPromised } from "../utils/eventPromised";

jest.mock("../commands/build");

const mockedUtils = utils as any;
const mockedDev = buildCmd as jest.Mocked<typeof buildCmd>;

describe("build", () => {
  beforeEach(() => {
    mockedUtils.isFrontityProjectRoot = jest.fn();
    mockedUtils.errorLogger = jest.fn(() => {
      throw new Error("Process terminated");
    });
    mockedDev.default.mockReset();
    mockedDev.default.mockReturnValue(
      new EventPromised((resolve) => resolve())
    );
  });

  test("should receive default values", async () => {
    await build({});
    expect(mockedDev.default.mock.calls).toMatchSnapshot();
  });

  test("should get values from ENV variables", async () => {
    process.env.FRONTITY_TARGET = "es5";
    process.env.FRONTITY_DEVELOPMENT = "true";
    process.env.FRONTITY_PUBLIC_PATH = "/public/path";

    await build({});
    expect(mockedDev.default.mock.calls).toMatchSnapshot();
  });

  test("should ignore ENV variables for passed arguments", async () => {
    process.env.FRONTITY_TARGET = "es5";
    process.env.FRONTITY_DEVELOPMENT = "true";
    process.env.FRONTITY_PUBLIC_PATH = "/public/path";

    await build({
      target: "module",
      development: false,
      publicPath: "/static",
    });
    expect(mockedDev.default.mock.calls).toMatchSnapshot();
  });

  test("should fail if an invalid target is passed", async () => {
    try {
      await build({ target: "not-valid-target" });
    } catch (error) {
      // Ignore error.
    }
    expect(mockedDev.default).not.toHaveBeenCalled();
    expect(mockedUtils.errorLogger.mock.calls).toMatchSnapshot();
  });
});
