import { EOL } from "os";
import ora from "ora";
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
import chalk from "chalk";
import { isEmptyDir, normalizeOptions } from "../utils";
import { CreateOptions, PackageJson } from "../types";

export default async (passedOptions?: CreateOptions) => {
  // 1. Parses and validates options.
  const { name, path, packages, typescript, emitter } = normalizeOptions(
    passedOptions
  );
  if (emitter) {
    emitter.emit("create", chalk.bold.underline("Frontity Create"));
  }

  // 2. Ensures that the directory exists and is empty.
  {
    if (emitter) {
      emitter.emit(
        "create",
        `Creating ${chalk.green(name)} project in ${chalk.yellow(path)}`,
        true
      );
    }
    ensureDirSync(path);
    process.chdir(path);
    if (!isEmptyDir(path))
      throw new Error("The directory passed to `create` function is not empty");
  }

  // 3. Generates `package.json`.
  {
    if (emitter) {
      emitter.emit(
        "create",
        `Generating ${chalk.yellow("package.json")}`,
        true
      );
    }
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

  // 4. Generates `frontity.settings.js`.
  {
    const fileExtension = typescript ? "ts" : "js";
    if (emitter) {
      emitter.emit(
        "create",
        `Generating ${chalk.yellow(`frontity.settings.${fileExtension}`)}`,
        true
      );
    }
    const frontitySettings = { name, packages };
    const fileTemplate = readFileSync(
      resolve(__dirname, `../templates/settings-${fileExtension}-template`),
      { encoding: "utf8" }
    );
    const fileName = `frontity.settings.${fileExtension}`;
    const fileData = fileTemplate.replace(/\$([\w-]+)\$/g, (_match, key) => {
      if (key === "settings") return JSON.stringify(frontitySettings, null, 2);
    });
    writeFileSync(fileName, fileData);
  }

  // 5. Installs Frontity packages.
  {
    if (emitter) {
      emitter.emit(
        "create",
        `Installing ${packages.map(pkg => chalk.green(pkg)).join(", ")}`,
        true
      );
    }
    const command = `npm i ${packages.join(" ")}`;
    await new Promise(resolve =>
      exec(command, { silent: true }, () => resolve())
    );
  }

  // 6. Clones `@frontity/mars-theme` inside `packages`.
  {
    if (emitter) {
      emitter.emit(
        "create",
        `Cloning ${chalk.green("@frontity/mars-theme")}`,
        true
      );
    }
    const path = "packages/mars-theme";
    ensureDirSync(path);
    process.chdir(path);
    const command = "npm pack @frontity/mars-theme";
    await new Promise(resolve =>
      exec(command, { silent: true }, () => resolve())
    );
    const tarball = readDirSync("./").find(file => /\.tgz$/.test(file));
    extract({ file: tarball, sync: true, strip: 1 });
    removeSync(tarball);
    process.chdir("../..");
  }

  if (emitter) {
    emitter.emit(
      "create",
      `${chalk.bold(
        "Frontity project created"
      )}\n\nYou can start development with ${chalk.bold.green(
        "frontity dev"
      )}\nFor documentation visit ${chalk.underline.magenta(
        "https://docs.frontity.org/"
      )}\n`
    );
  }
};
