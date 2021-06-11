import symlinkDir from "symlink-dir";
import { pathExists } from "fs-extra";
import { resolve } from "path";
import { promises as fsPromises } from "fs";

const semverRE =
  /^(~|\^|<|>|=)?([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/;
const RE = /^(file:)?(~)?(\.{0,2}?\/([\w+\-_]+)?)+$/;

/**
 * Check whether the given string isn't a semver.
 *
 * @param dir - Possible directory path.
 * @returns True if not a semver.
 */
const isNotSemanticVersion = (dir: string) => !semverRE.test(dir);

/**
 * Check whether the given string is a path pointing to a local package.
 *
 * @param dir - Possible link path.
 * @returns True if it's a valid link path.
 */
const isValidLinkPath = (dir: string) => RE.test(dir);

/**
 * Check whether the given directory contains a Node package.
 *
 * @param dir - Directory path.
 * @returns True if it's a node package.
 */
const isValidNodePackage = async (dir: string) =>
  await pathExists(resolve(dir, "package.json"));

/**
 * Read the file with the given path in utf8 format.
 *
 * @remarks This function replaces {@link fs-extra#readFile} because it doesn't
 * work with {@link mock-fs#default}, which is used by unit tests.
 *
 * @param path - File path.
 * @returns String with the file content.
 */
const readFileUtf8 = async (path: string) => {
  const fileHandle = await fsPromises.open(path, "r");
  return await fileHandle.readFile({ encoding: "utf8" });
};

export default async () => {
  // Get dependencies from CWD package.json
  const packageJsonPath = resolve(process.env.CWD, "./package.json");
  const packageJson = JSON.parse(await readFileUtf8(packageJsonPath));
  const { dependencies } = packageJson;

  const dependencyNames = Object.keys(dependencies).filter(
    (dependency) =>
      isNotSemanticVersion(dependencies[dependency]) &&
      isValidLinkPath(dependencies[dependency])
  );

  await Promise.all(
    // Iterate over the dependencies.
    dependencyNames.map(async (name) => {
      const packageDir = dependencies[name].replace(/^(file:)/, "");

      const dir = resolve(process.env.CWD, packageDir);
      // Check if the folder exists.
      const exists = await pathExists(dir);
      // Check if package.json exists
      const isNodePackage = await isValidNodePackage(dir);

      if (!exists) {
        throw new Error(`${dir} for ${name} does not exist.`);
      }

      if (!isNodePackage) {
        throw new Error(`${name} is not a valid node package.`);
      }

      try {
        await symlinkDir(dir, resolve("node_modules", name));
      } catch (e) {
        throw new Error(e);
      }
    })
  );
};
