import chalk from "chalk";
import { errorLogger } from "../utils";
import choosePort from "../utils/choosePort";

const HOST = process.env.HOST || "0.0.0.0";

export default async ({
  production = false,
  port = 3000,
  https = false,
  target = "module",
  dontOpenBrowser = false,
  publicPath = "/static/",
}: {
  production?: boolean;
  port?: number;
  https?: boolean;
  target?: "es5" | "module";
  dontOpenBrowser?: boolean;
  publicPath?: string;
}) => {
  let dev: Function;

  const options = {
    mode: production ? "production" : "development",
    port,
    isHttps: !!https,
    target,
    openBrowser: !dontOpenBrowser,
    publicPath,
  };

  try {
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
