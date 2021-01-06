import chalk from "chalk";
import fetch from "node-fetch";
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

export const isNamespaceValid = (name: string): boolean => {
  // This one matches only words. Meaning, dashes, spaces, etc. are invalid
  const rule = /^\w+$/g;
  return rule.test(name);
};

export const toCamelCase = (name: string): string => {
  // This one matches the dash separated values: my-namespace-is-cool
  const rule = /-[a-z]/gi;

  return name.replace(rule, (group) => {
    // Here we're grabbing the dash plus the following letter
    // and return the uppercased value of that letter.
    return group[1].toUpperCase();
  });
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
  return dirContent.some((content) =>
    /^frontity\.settings\.(js|ts)$/i.test(content)
  );
};

export const fetchPackageVersion = async (pkg: string) => {
  const response = await fetch(`https://registry.npmjs.com/${pkg}`);
  const data = await response.json();
  if (data.error) throw new Error(`Package "${pkg}" not found on NPM.`);

  const version = data["dist-tags"].latest;
  return version;
};

export const log = (msg?: any, ...optionalParams: any[]) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(msg, ...optionalParams);
  }
};
