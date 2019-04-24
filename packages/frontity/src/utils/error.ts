import chalk from "chalk";

export default (error: Error, message?: string) => {
  console.error(
    chalk.bold.red("\nError: ") +
      chalk.red(error.message) +
      "\n\n" +
      (message || "") +
      `If you need help please visit ${chalk.underline.magenta(
        "https://community.frontity.org/"
      )}.\n`
  );
  process.exit(1);
};
