import leven from "leven";
import { CommanderStatic } from "commander";
import chalk from "chalk";

/**
 * The CLI command that runs when the user types a command that doesn't exit.
 *
 * @param command - Unknown command.
 * @param program - Commander instance.
 */
const unknown = (command: string, program: CommanderStatic) => {
  console.log(chalk.red(`Unknown command: ${chalk.bold(command)}`));

  const availableCommands: string[] = program.commands.map((c) => c._name);
  const suggestion: string = availableCommands.find(
    (c) => leven(c, command) < 3
  );

  if (suggestion) {
    console.log(chalk.cyan(`Did you mean '${suggestion}'?`));
  }

  program.help();
};

export default unknown;
