import chalk from "chalk";
import { errorLogger } from "../utils";
import choosePort from "../utils/choosePort";

const HOST = process.env.HOST || "0.0.0.0";

export default async ({
  production,
  port,
  https,
  target,
  dontOpenBrowser,
  publicPath,
}) => {
  let dev: Function;

  const options = {
    mode: production ? "production" : "development",
    port: parseInt(port, 10) || 3000,
    isHttps: !!https,
    target: target || "module",
    openBrowser: !dontOpenBrowser,
    publicPath: publicPath || "/static/",
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
