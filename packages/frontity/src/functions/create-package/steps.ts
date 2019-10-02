import { EOL } from "os";
import { resolve as resolvePath, join } from "path";
import { ensureDir, writeFile, remove } from "fs-extra";
import { exec } from "child_process";
import { promisify } from "util";
import { Options } from "./types";

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
    "frontity": "^1.3.1"
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
    <div>
      You can edit your package in:
      <pre>${packagePath}/src/index.js</pre>
    </div>
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
