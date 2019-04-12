import { EOL } from "os";
import {
  ensureDirSync,
  readdirSync,
  removeSync,
  writeFileSync
} from "fs-extra";
import { exec } from "shelljs";
import { extract } from "tar";
import { isEmptyDir, normalizeOptions } from "../utils";
import { CreateOptions, PackageJson } from "../types";
import emitter from "../emitter";

const emit = (message: string) => emitter.emit("create", message);

export default (passedOptions?: CreateOptions) => {
  // 1. Parses and validates options.
  emit("Parsing and validating options");
  const { name, path, packages } = normalizeOptions(passedOptions);

  // 2. Ensures that the directory exists and is empty.
  {
    emit(`Creating project in ${path}`);
    ensureDirSync(path);
    process.chdir(path);
    if (!isEmptyDir(path))
      throw new Error("The directory passed to `create` function is not empty");
  }

  // 3. Initiates Git repository.
  {
    emit("Initiating Git repository");
  }

  // 4. Generates `package.json`.
  {
    emit("Generating package.json");
    const packageJson: PackageJson = {
      name,
      version: "0.1.0",
      description: "Frontity project",
      keywords: ["frontity"],
      scripts: {
        dev: "frontity dev",
        build: "frontity build",
        serve: "frontity serve"
      }
    };
    const fileName = "package.json";
    const fileData = `${JSON.stringify(packageJson, null, 2)}${EOL}`;
    writeFileSync(fileName, fileData);
  }

  // 5. Generates `frontity.settings.js`.
  {
    emit("Generating frontity.settings.js");
    const frontitySettings = { name, packages };
    const fileName = "frontity.settings.js";
    const fileData = `module.exports = ${JSON.stringify(
      frontitySettings,
      null,
      2
    )}${EOL}`;
    writeFileSync(fileName, fileData);
  }

  // 6. Generates `.gitignore`.
  {
    emit("Generating .gitignore");
  }

  // 7. Generates `README.md`.
  {
    emit("Generating README.md");
  }

  // 8. Installs Frontity packages.
  {
    emit(`Installing ${packages.join(", ")}`);
    const command = `npm i ${packages.join(" ")}`;
    exec(command, { silent: true });
  }

  // 9. Clones `@frontity/starter-theme` inside `packages`.
  {
    emit("Cloning @frontity/starter-theme");
    const path = "packages/starter-theme";
    ensureDirSync(path);
    process.chdir(path);
    const command = "npm pack @frontity/h2r";
    exec(command, { silent: true });
    const tarball = readdirSync("./").find(file => /\.tgz$/.test(file));
    extract({ file: tarball, sync: true, strip: 1 });
    removeSync(tarball);
  }

  // 10. Commit changes to Git.
  {
    emit("Commiting changes");
  }
};
