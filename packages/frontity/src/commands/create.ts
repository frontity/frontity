import { EOL } from "os";
import { resolve } from "path";
import {
  ensureDirSync,
  readdirSync as readDirSync,
  readFileSync,
  writeFileSync,
  removeSync
} from "fs-extra";
import { exec } from "shelljs";
import { extract } from "tar";
import { isEmptyDir, isGitRepository, normalizeOptions } from "../utils";
import { CreateOptions, PackageJson } from "../types";
import emitter from "../emitter";

const emit = (message: string) => emitter.emit("create", message);

export default (passedOptions?: CreateOptions) => {
  // 1. Parses and validates options.
  emit("Parsing and validating options");
  const { name, path, packages, typescript } = normalizeOptions(passedOptions);

  // 2. Ensures that the directory exists and is empty.
  {
    emit(`Creating project in ${path}`);
    ensureDirSync(path);
    process.chdir(path);
    if (!isEmptyDir(path))
      throw new Error("The directory passed to `create` function is not empty");
  }

  // 3. Initiates Git repository.
  // {
  //   emit("Initiating Git repository");
  //   if (!isGitRepository(path)) {
  //     const command = "git init";
  //     exec(command, { silent: true });
  //   }
  // }

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
    const fileExtension = typescript ? "ts" : "js";
    emit(`Generating frontity.settings.${fileExtension}`);
    const frontitySettings = { name, packages };
    const fileTemplate = readFileSync(
      resolve(__dirname, `../templates/settings-${fileExtension}-template`),
      { encoding: "utf8" }
    );
    const fileName = `frontity.settings.${fileExtension}`;
    const fileData = `${fileTemplate.replace(/\$([\w-]+)\$/g, (_match, key) => {
      if (key === "settings") return JSON.stringify(frontitySettings, null, 2);
    })}${EOL}`;
    writeFileSync(fileName, fileData);
  }

  // 6. Generates `.gitignore`.
  // {
  //   emit("Generating .gitignore");
  //   const gitIgnore = readFileSync(
  //     resolve(__dirname, "../templates/gitignore-template"),
  //     { encoding: "utf8" }
  //   );
  //   const fileName = ".gitignore";
  //   const fileData = `${gitIgnore}${EOL}`;
  //   writeFileSync(fileName, fileData);
  // }

  // 7. Generates `README.md`.
  // {
  //   emit("Generating README.md");
  //   const readme = readFileSync(
  //     resolve(__dirname, "../templates/readme-template"),
  //     { encoding: "utf8" }
  //   );
  //   const fileName = "README.md";
  //   const fileData = `${readme.replace(/\$([\w-]+)\$/g, (_match, key) => {
  //     if (key === "name") return name;
  //   })}${EOL}`;
  //   writeFileSync(fileName, fileData);
  // }

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
    const tarball = readDirSync("./").find(file => /\.tgz$/.test(file));
    extract({ file: tarball, sync: true, strip: 1 });
    removeSync(tarball);
    process.chdir("../..");
  }

  // 10. Commits changes to Git.
  // {
  //   emit("Commiting changes");
  //   const command = 'git add . && git commit -m "Setup Frontity"';
  //   exec(command, { silent: true });
  // }
};
