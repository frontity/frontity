import { CommanderStatic } from "commander";
import chalk from "chalk";

export default (command: string, program: CommanderStatic) => {
  console.log(chalk.red(`Unknown command: ${chalk.bold(command)}\n`));
  program.help();
};
