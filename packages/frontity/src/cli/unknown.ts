import didYouMean from "didyoumean";
import { CommanderStatic } from "commander";
import chalk from "chalk";

/**
 * @param {String} command - Unknown command
 * @param {CommanderStatic} program - commander instance
 *
 * @returns {void}
 */

export default (command: string, program: CommanderStatic) => {
  console.log(chalk.red(`Unknown command: ${chalk.bold(command)}`));

  const availableCommands: string[] = program.commands.map(c => c._name);
  const suggestion: string | string[] = didYouMean(command, availableCommands);

  if (suggestion) {
    console.log(chalk.cyan(`Did you mean '${suggestion}'?`));
  }

  program.help();
};
