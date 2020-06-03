import dev from "../cli/dev";
import * as utils from "../utils";
import * as devCmd from "../commands/dev";
import { EventPromised } from "../utils/eventPromised";

jest.mock("../commands/dev");

const mockedUtils = utils as any;
const mockedDev = devCmd as jest.Mocked<typeof devCmd>;

describe("dev", () => {
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
    await dev({});
    expect(mockedDev.default.mock.calls).toMatchSnapshot();
  });

  test("should get values from ENV variables", async () => {
    process.env.FRONTITY_TARGET = "es5";
    process.env.FRONTITY_PORT = "3001";
    process.env.FRONTITY_HTTPS = "true";
    process.env.FRONTITY_PRODUCTION = "true";
    process.env.FRONTITY_PUBLIC_PATH = "/public/path";
    process.env.FRONTITY_DONT_OPEN_BROWSER = "true";

    await dev({});
    expect(mockedDev.default.mock.calls).toMatchSnapshot();
  });

  test("should ignore ENV variables for passed arguments", async () => {
    process.env.FRONTITY_TARGET = "es5";
    process.env.FRONTITY_PORT = "3001";
    process.env.FRONTITY_HTTPS = "true";
    process.env.FRONTITY_PRODUCTION = "true";
    process.env.FRONTITY_PUBLIC_PATH = "/public/path";
    process.env.FRONTITY_DONT_OPEN_BROWSER = "true";

    await dev({
      target: "module",
      port: "4000",
      https: false,
      production: false,
      publicPath: "/static",
      dontOpenBrowser: false,
    });
    expect(mockedDev.default.mock.calls).toMatchSnapshot();
  });

  test("should fail if an invalid target is passed", async () => {
    try {
      await dev({ target: "not-valid-target" });
    } catch (error) {
      // Ignore error.
    }
    expect(mockedDev.default).not.toHaveBeenCalled();
    expect(mockedUtils.errorLogger.mock.calls).toMatchSnapshot();
  });

  test("should fail if an invalid port is passed", async () => {
    try {
      await dev({ port: "not-valid-port" });
    } catch (error) {
      // Ignore error.
    }
    expect(mockedDev.default).not.toHaveBeenCalled();
    expect(mockedUtils.errorLogger.mock.calls).toMatchSnapshot();
  });
});
