import symlinkDir from "symlink-dir";
import { pathExists } from "fs-extra";
import { resolve } from "path";

const semverRE = /^(~|\^|<|>|=)?([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/;
const RE = /^(file:)?(~)?(\.{0,2}?\/([\w+\-_]+)?)+$/;

const isNotSemanticVersion = (dir) => !semverRE.test(dir);
const isValidLinkPath = (dir) => RE.test(dir);

const isValidNodePackage = async (dir) =>
  await pathExists(resolve(dir, "package.json"));

export default async () => {
  // Get dependencies from CWD package.json
  const { dependencies } = await import(process.env.CWD + "/package.json");

  const dependencyNames = await Object.keys(dependencies).filter(
    (dependency) =>
      isNotSemanticVersion(dependencies[dependency]) &&
      isValidLinkPath(dependencies[dependency])
  );

  await Promise.all(
    // Iterate over the dependencies.
    dependencyNames.map(async (name) => {
      const packageDir = dependencies[name].replace(/^(file:)/, "");

      const dir = await resolve(process.cwd(), packageDir);
      // Check if the folder exists.
      const exists = await pathExists(dir);
      // Check if package.json exists
      const isNodePackage = await isValidNodePackage(dir);

      if (!exists) {
        throw new Error(`${dir} for ${name} is not a directory.`);
      }

      if (!isNodePackage) {
        throw new Error(`${name} is not a valid node package`);
      }

      try {
        await symlinkDir(dir, resolve("node_modules", name));
      } catch (e) {
        throw new Error(e);
      }
    })
  );
};
