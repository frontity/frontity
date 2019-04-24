import chalk from "chalk";
import errorLogger from "../utils/error";

export default async ({ production, port, https, target }) => {
  let dev: Function;

  const options = {
    mode: production ? "production" : "development",
    port: parseInt(port, 10) || 3000,
    isHttps: !!https,
    target: target || "module"
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
    await dev(options);
  } catch (error) {
    errorLogger(error);
  }
};
