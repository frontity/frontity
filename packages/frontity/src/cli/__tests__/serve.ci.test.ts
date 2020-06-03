import serve from "../serve";
import * as utils from "../../utils";
import * as serveCmd from "../../commands/serve";
import { EventPromised } from "../../utils/eventPromised";

jest.mock("../../commands/serve");

const mockedUtils = utils as any;
const mockedDev = serveCmd as jest.Mocked<typeof serveCmd>;

describe("serve", () => {
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
    await serve({});
    expect(mockedDev.default.mock.calls).toMatchSnapshot();
  });

  test("should get values from ENV variables", async () => {
    process.env.FRONTITY_PORT = "3001";
    process.env.FRONTITY_HTTPS = "true";

    await serve({});
    expect(mockedDev.default.mock.calls).toMatchSnapshot();
  });

  test("should ignore ENV variables for passed arguments", async () => {
    process.env.FRONTITY_PORT = "3001";
    process.env.FRONTITY_HTTPS = "true";

    await serve({
      port: "4000",
      https: false,
    });
    expect(mockedDev.default.mock.calls).toMatchSnapshot();
  });

  test("should fail if an invalid port is passed", async () => {
    try {
      await serve({ port: "not-valid-port" });
    } catch (error) {
      // Ignore error.
    }
    expect(mockedDev.default).not.toHaveBeenCalled();
    expect(mockedUtils.errorLogger.mock.calls).toMatchSnapshot();
  });
});
