import chalk from "chalk";
import { readdir as readDir } from "fs-extra";

export const isPackageNameValid = (name: string): boolean => {
  if (name.length >= 214) return false;
  if ("._".includes(name[0])) return false;
  const specialCharacters = /[/:*?"<>|]/;
  if (specialCharacters.test(name)) return false;
  const nameConventionMatch = /^(?:@[a-z0-9_.-]+\/)?[a-z0-9_.-]+$/;
  return nameConventionMatch.test(name);
};

export const isThemeNameValid = (name: string): boolean => {
  const nameConventionMatch = /^(?:@[\w-]+\/)?[\w-]+$/;
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

export const isFrontityProjectRoot = async (path: string) => {
  const dirContent = await readDir(path);
  return dirContent.some(content =>
    /^frontity\.settings\.(js|ts)$/i.test(content)
  );
};
