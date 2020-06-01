import didYouMean from "didyoumean";
import { CommanderStatic } from "commander";
import chalk from "chalk";

/**
 * Handle unknown commands by making suggestions with the `didyoumean` library,
 * based on the available commands.
 *
 * @param command - The Unknown command.
 * @param program - The commander instance.
 */

const unknown = (command: string, program: CommanderStatic): void => {
  console.log(chalk.red(`Unknown command: ${chalk.bold(command)}`));

  const availableCommands: string[] = program.commands.map((c) => c._name);
  const suggestion: string | string[] = didYouMean(command, availableCommands);

  if (suggestion) {
    console.log(chalk.cyan(`Did you mean '${suggestion}'?`));
  }

  program.help();
};

export default unknown;
