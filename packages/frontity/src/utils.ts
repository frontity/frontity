import chalk from "chalk";

export const isPackageNameValid = (name: string): boolean => {
  if (name.length >= 214) return false;
  if ("._".includes(name[0])) return false;
  const specialCharacters = /^[^/:*?"<>|]+$/;
  if (specialCharacters.test(name)) return false;
  const nameConventionMatch = /^(?:@[a-z0-9_.-]+\/)?[a-z0-9_.-]+$/;
  return nameConventionMatch.test(name);
};

export const errorLogger = (error: Error, message?: string) => {
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
