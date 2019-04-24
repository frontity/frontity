import chalk from "chalk";
import errorLogger from "../utils/error";

export default async ({ development, target }) => {
  let build: Function;

  const options = {
    mode: development ? "development" : "production",
    target: target || "both"
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
