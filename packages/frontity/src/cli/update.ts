import ora from "ora";
import chalk from "chalk";
import { log, errorLogger } from "../utils";
import update from "../commands/update";

/**
 * The update CLI command, usually run with `npx frontity update`.
 *
 * It updates the dependencies of the Frontity project and its subpackages.
 */
export default async () => {
  try {
    // Get the emitter from `update`.
    const emitter = update();

    emitter.on("message", (message, action) => {
      if (action) ora.promise(action, message);
      else log(message);
    });

    // Actually create the package.
    await emitter;
  } catch (error) {
    errorLogger(error);
  }

  log(chalk.bold(`\nFrontity project updated!\n`));
};
