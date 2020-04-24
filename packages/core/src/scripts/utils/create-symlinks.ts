import symlinkDir from "symlink-dir";
import { pathExists } from "fs-extra";
import { resolve } from "path";

const isNotSemanticVersion = (dir) =>
  !/^(~|\^|<|>|=)?([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/.test(
    dir
  );

const isValidNodePackage = async (dir) =>
  await pathExists(resolve(dir, "package.json"));

export default async () => {
  // Get dependencies from CWD package.json
  const { dependencies } = await import(process.env.CWD + "/package.json");
  // Filter out semantics-versioned packages
  const dependencyNames = await Object.keys(dependencies).filter((dependency) =>
    isNotSemanticVersion(dependencies[dependency])
  );

  await Promise.all(
    // Iterate over the dependencies.
    dependencyNames.map(async (name) => {
      const packageDir = dependencies[name];

      const dir = await resolve(process.cwd(), packageDir);
      // Check if the folder exists.
      const exists = await pathExists(dir);
      // Check if package.json exists
      const isNodePackage = await isValidNodePackage(dir);

      console.log("Package Directory ====>", packageDir);
      console.log("Directory ====>", dir);
      console.log("Node Package ====>", isNodePackage);
      console.log("Exists ====>", exists);

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
