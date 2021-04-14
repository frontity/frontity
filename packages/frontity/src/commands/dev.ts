import chalk from "chalk";
import { errorLogger } from "../utils";
import choosePort from "../utils/choosePort";

const HOST = process.env.HOST || "0.0.0.0";

/**
 * Options for the {@link devCommand} function.
 */
interface DevOptions {
  /**
   * Builds the project for production.
   *
   * @defaultValue `false`
   */
  production?: boolean;

  /**
   * Runs the server on a custom port.
   *
   * @defaultValue `3000`
   */
  port?: number;

  /**
   * Runs the server using https.
   *
   * @defaultValue `false`
   */
  https?: boolean;

  /**
   * Create bundles with "es5" or "module".
   *
   * @defaultValue `"module"`
   */
  target?: "es5" | "module";

  /**
   * Don't open a browser window with the localhost.
   *
   * @defaultValue `false`
   */
  dontOpenBrowser?: boolean;

  /**
   * Set the public path for static assets.
   *
   * @defaultValue `"/static/"`
   */
  publicPath?: string;

  /**
   * Create HTML files for bundle analyzing.
   *
   * @defaultValue `false`
   */
  analyze?: boolean;
}

/**
 * Start a server in development mode.
 *
 * This function is executed by the CLI when running the `npx frontity dev`
 * command.
 *
 * @param options - Object of type {@link DevOptions}.
 */
const devCommand = async ({
  production = false,
  port = 3000,
  https = false,
  target = "module",
  dontOpenBrowser = false,
  publicPath = "/static/",
  analyze = false,
}: DevOptions) => {
  // Try getting the `dev` function from `@frontity/core`.
  let dev: (...options: any[]) => Promise<void>;

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    dev = require("@frontity/core").dev;
  } catch (error) {
    const message =
      `Make sure that you are running ${chalk.green(
        "frontity"
      )} inside a Frontity project.\n` +
      `If so try installing ${chalk.green(
        "@frontity/core"
      )} again with ${chalk.green("npm i @frontity/core")}.\n`;
    errorLogger(error, message);
  }

  // Generate options for the core's `dev` function.
  const options = {
    mode: production ? "production" : "development",
    port,
    isHttps: !!https,
    target,
    openBrowser: !dontOpenBrowser,
    publicPath,
    analyze,
  };

  try {
    const port = await choosePort(HOST, options.port);
    if (port === null) {
      return;
    }
    await dev({ ...options, port });
  } catch (error) {
    errorLogger(error);
  }
};

export default devCommand;
