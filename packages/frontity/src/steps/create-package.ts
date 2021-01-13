import { EOL } from "os";
import { resolve as resolvePath, join } from "path";
import { writeFile } from "fs-extra";
import { exec } from "child_process";
import { promisify } from "util";
import { fetchPackageVersion } from "../utils";

/**
 * Options passed to the `create-package` function.
 */
export type Options = {
  /**
   * Name of the package.
   */
  name?: string;

  /**
   * Namespace of the package.
   */
  namespace?: string;

  /**
   * Path of the Frontity project.
   */
  projectPath?: string;

  /**
   * Path where the package should be created (relative to `projectPath`).
   */
  packagePath?: string;
};

/**
 * This function creates a `package.json` file.
 * @param name - The package name
 * @param namespace - Namespace
 * @param projectPath - Project path
 * @param packagePath - Package path
 */
export const createPackageJson = async (
  name: string,
  namespace: string,
  projectPath: string,
  packagePath: string
) => {
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
export const createSrcIndexJs = async (
  name: string,
  namespace: string,
  projectPath: string,
  packagePath: string
) => {
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
export const installPackage = async (
  projectPath: string,
  packagePath: string
) => {
  await promisify(exec)(`npm install ${packagePath}`, { cwd: projectPath });
};
