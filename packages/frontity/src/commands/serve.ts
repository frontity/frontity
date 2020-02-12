import chalk from "chalk";
import { errorLogger } from "../utils";

export default async ({ port, https }) => {
  let serve: Function;

  const options = {
    port: parseInt(port, 10) || 3000,
    isHttps: !!https
  };

  try {
    serve = require("@frontity/core").serve;
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
    await serve(options);
  } catch (error) {
    errorLogger(error);
  }
};
