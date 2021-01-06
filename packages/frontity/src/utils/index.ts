import chalk from "chalk";
import fetch from "node-fetch";
import { readdir as readDir } from "fs-extra";

/**
 * Validation for package name.
 *
 * @param name - The package name to be checked.
 * @returns Whether the given name is valid.
 */
export const isPackageNameValid = (name: string): boolean => {
  if (name.length >= 214) return false;
  if ("._".includes(name[0])) return false;
  const specialCharacters = /[/:*?"<>|]/;
  if (specialCharacters.test(name)) return false;
  const nameConventionMatch = /^(?:@[a-z0-9_.-]+\/)?[a-z0-9_.-]+$/;
  return nameConventionMatch.test(name);
};

/**
 * Theme name validation.
 *
 * @param name - The theme name to be checked.
 * @returns Wheather the given name is valid.
 */
export const isThemeNameValid = (name: string): boolean => {
  const nameConventionMatch = /^(?:@[\w-]+\/)?[\w-]+$/;
  return nameConventionMatch.test(name);
};

/**
 * Namespace value validation.
 *
 * @param name - Namespace value.
 * @returns Weather the given name is valid.
 */
export const isNamespaceValid = (name: string): boolean => {
  // This one matches only words. Meaning, dashes, spaces, etc. are invalid
  const rule = /^\w+$/g;
  return rule.test(name);
};

/**
 * Takes a name, as string, and converts it to camelCase if it contains non alpha chars.
 *
 * @param name - The name value to be converted.
 * @returns The converted name.
 */
export const toCamelCase = (name: string): string => {
  // This one matches the dash separated values: my-namespace-is-cool
  const rule = /-[a-z]/gi;

  return name.replace(rule, (group) => {
    // Here we're grabbing the dash plus the following letter
    // and return the uppercased value of that letter.
    return group[1].toUpperCase();
  });
};

/**
 * Logs an error to the console preformatted with the proper color.
 *
 * @param error - The error instance.
 * @param message - The optional message.
 */
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

/**
 * Checks if the given path is a valid frontity project.
 *
 * @param path - The path to check.
 * @returns If the path is a valid project root.
 */
export const isFrontityProjectRoot = async (path: string): Promise<boolean> => {
  const dirContent = await readDir(path);
  return dirContent.some((content) =>
    /^frontity\.settings\.(js|ts)$/i.test(content)
  );
};

/**
 * Fetches the given package version. The latest one.
 *
 * @param pkg - The package name.
 * @returns The latest version.
 */
export const fetchPackageVersion = async (pkg: string): Promise<string> => {
  const response = await fetch(`https://registry.npmjs.com/${pkg}`);
  const data = await response.json();
  if (data.error) throw new Error(`Package "${pkg}" not found on NPM.`);

  const version = data["dist-tags"].latest;
  return version;
};

/**
 * Utility function to log to console.
 *
 * @param msg - The message to be logged.
 * @param optionalParams - Optional parameters.
 */
export const log = (msg?: any, ...optionalParams: any[]) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(msg, ...optionalParams);
  }
};
