import chalk from "chalk";
import { errorLogger } from "../utils";

export default async ({ development, target, publicPath }) => {
  let build: Function;

  const options = {
    mode: development ? "development" : "production",
    target: target || "both",
    publicPath: publicPath || "/static/",
  };

  try {
    build = require("@frontity/core").build;
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
    await build(options);
  } catch (error) {
    errorLogger(error);
  }
};
