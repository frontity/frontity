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

  const [suggestion] = availableCommands
    // Compute the distance of each command and return it along with the name.
    .map((name) => ({ name, distance: leven(name, command) }))
    // Filter commands by threshold.
    .filter(({ name, distance }) => distance < name.length * 0.4)
    // Sort them so the one with the least distance would be the first one.
    .sort((c1, c2) => c1.distance - c2.distance)
    // Map them and return only the command name.
    .map((c) => c.name);

  if (suggestion) {
    console.log(chalk.cyan(`Did you mean '${suggestion}'?`));
  }

  program.help();
};

export default unknown;
