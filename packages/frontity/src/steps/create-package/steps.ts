import { EOL } from "os";
import { resolve as resolvePath, join } from "path";
import { ensureDir, writeFile, remove, pathExists } from "fs-extra";
import { exec } from "child_process";
import { promisify } from "util";
import { Options } from "./types";
import { fetchPackageVersion } from "../../utils";

// This function returns true if the directory is not empty and false otherwise.
export const isDirNotEmpty = ({ packagePath }: Options): Promise<boolean> => {
  return pathExists(join(packagePath));
};

// This function ensures all directories that needs a package exist.
export const ensurePackageDir = ({ packagePath }: Options): Promise<void> => {
  return ensureDir(join(packagePath, "src"));
};

// This function creates a `package.json` file.
export const createPackageJson = async ({
  name,
  namespace,
  projectPath,
  packagePath
}: Options) => {
  // Get the latest version of Frontity from NPM registry
  const frontityVersion = await fetchPackageVersion("frontity");

  const filePath = resolvePath(projectPath, packagePath, "package.json");
  const fileData = `{
  "name": "${name}",
  "version": "1.0.0",
  "description": "Frontity package created using the Frontity CLI.",
  "keywords": [
    "frontity",
    "frontity-${namespace}"
  ],
  "license": "Apache-2.0",
  "dependencies": {
    "frontity": "^${frontityVersion}"
  }
}${EOL}`;
  await writeFile(filePath, fileData);
};

// This function creates an `index.js` file.
export const createSrcIndexJs = async ({
  name,
  namespace,
  projectPath,
  packagePath
}: Options) => {
  const filePath = resolvePath(projectPath, packagePath, "src/index.js");
  const fileData = `import React from "react";

const Root = () => {
  return (
    <>
      You can edit your package in:
      <pre>${join(packagePath, "src/index.js")}</pre>
    </>
  );
};

export default {
  name: "${name}",
  roots: {
    ${namespace}: Root
  },
  state: {
    ${namespace}: {}
  },
  actions: {
    ${namespace}: {}
  }
};${EOL}`;
  await writeFile(filePath, fileData);
};

// This function executes the `npm i` command to add the
// created package
export const installPackage = async ({ projectPath, packagePath }: Options) => {
  await promisify(exec)(`npm install ${packagePath}`, { cwd: projectPath });
};

// This function removes the files and directories created
// with `frontity create-package`.
export const revertProgress = async ({ projectPath, packagePath }: Options) => {
  await remove(join(projectPath, packagePath));
};
