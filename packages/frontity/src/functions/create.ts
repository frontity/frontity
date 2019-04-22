import { EOL } from "os";
import { resolve } from "path";
import {
  ensureDir,
  readdir as readDir,
  readFile,
  writeFile,
  remove
} from "fs-extra";
import { exec } from "shelljs";
import { extract } from "tar";
import chalk from "chalk";
import { mergeRight } from "ramda";
import p from "phin";
import { CreateOptions, PackageJson } from "../types";

let dirExisted: boolean = false;

const defaultOptions: CreateOptions = {
  path: process.cwd(),
  typescript: false,
  packages: ["frontity", "@frontity/file-settings"],
  theme: "@frontity/mars-theme"
};

// This function normalizes and validates options.
const normalizeOptions = (passedOptions: CreateOptions): CreateOptions => {
  const options = mergeRight(defaultOptions, passedOptions);

  // Normalize and validate `name` option.
  options.name = options.name.replace(/[\s_-]+/g, "-").toLowerCase();
  const nameConventionMatch = /^(?:@[\w-]+\/)?[\w-]+$/;
  if (!nameConventionMatch.test(options.name))
    throw new Error(
      "The name of the package is not valid. Please enter a valid one (only letters and dashes)."
    );

  return options;
};

// This function ensures that the directory exists and is empty.
const ensureAppDir = async ({ path }: CreateOptions) => {
  await ensureDir(path);
  process.chdir(path);
  const dirContent = await readDir("./");

  // If the directory is not empty check if it's an empty repository.
  if (dirContent.length) {
    const allowedContent = ["readme.md", "license", ".gitignore", ".git"];
    const notAllowedContent = dirContent.filter(
      content => !allowedContent.includes(content.toLowerCase())
    );
    // If it's not an empty repository.
    if (notAllowedContent.length) {
      throw new Error("The directory passed to `create` function is not empty");
    } else {
      dirExisted = true;
    }
  }
};

// This function creates a `package.json` file.
const createPackageJson = async ({ name, packages, theme }: CreateOptions) => {
  // Add Frontity packages to the dependencies.
  const dependencies = (await Promise.all(
    packages.map(async pkg => {
      // Get the version of each package.
      const version = (await p({
        url: `https://registry.npmjs.com/${pkg}`,
        parse: "json"
      })).body["dist-tags"].latest;
      return [pkg, `^${version}`];
    })
  )).reduce((final, current) => {
    // Reduce the packages into a dependecies object.
    final[current[0]] = current[1];
    return final;
  }, {});

  // Add the starter theme to the dependencies.
  const themeName = (theme.match(/\/?([\w-]+)$/) || [, ""])[1];
  dependencies[theme] = `./packages/${themeName}`;

  const packageJson: PackageJson = {
    name,
    version: "0.1.0",
    description: "Frontity project",
    keywords: ["frontity"],
    scripts: {
      dev: "frontity dev",
      build: "frontity build",
      serve: "frontity serve"
    },
    dependencies
  };

  const fileName = "package.json";
  const fileData = `${JSON.stringify(packageJson, null, 2)}${EOL}`;
  await writeFile(fileName, fileData);
};

// This function creates a `frontity.settings` file.
const createFrontitySettings = async (
  fileExtension: string,
  { name, path, packages }: CreateOptions
) => {
  process.chdir(path);
  const frontitySettings = { name, packages };
  const fileTemplate = await readFile(
    resolve(__dirname, `../templates/settings-${fileExtension}-template`),
    { encoding: "utf8" }
  );
  const fileName = `frontity.settings.${fileExtension}`;
  const fileData = fileTemplate.replace(/\$([\w-]+)\$/g, (_match, key) => {
    if (key === "settings") return JSON.stringify(frontitySettings, null, 2);
  });
  await writeFile(fileName, fileData);
};

// This functions clones the starter theme.
const cloneStarterTheme = async ({ path, theme }: CreateOptions) => {
  process.chdir(path);
  const themePath = JSON.parse(
    await readFile("./package.json", { encoding: "utf8" })
  ).dependencies[theme];
  await ensureDir(themePath);
  process.chdir(themePath);
  const command = `npm pack ${theme}`;
  await new Promise(resolve =>
    exec(command, { silent: true }, () => resolve())
  );
  const tarball = (await readDir("./")).find(file => /\.tgz$/.test(file));
  await extract({ file: tarball, strip: 1 });
  await remove(tarball);
};

// This function installs the Frontity packages.
const installDependencies = async ({ path }: CreateOptions) => {
  process.chdir(path);
  const command = `npm install`;
  await new Promise(resolve =>
    exec(command, { silent: true }, () => resolve())
  );
};

// This function removes the files and directories created
// with `frontity create`.
const revertProgress = async ({ path }: CreateOptions) => {
  process.chdir(path);
  if (dirExisted) {
    const removableContent = [
      "node_modules",
      "frontity.settings.js",
      "frontity.settings.ts",
      "tsconfig.json",
      "package.json",
      "package-lock.json",
      "packages"
    ];
    for (const content of removableContent) await remove(content);
  } else {
    await remove(path);
  }
};

export default async (passedOptions?: CreateOptions) => {
  // 1. Parses and validates options.
  const { emitter, ...options } = normalizeOptions(passedOptions);

  let step: Promise<void>;

  try {
    // 2. Ensures that the app dir exists and is empty.
    step = ensureAppDir(options);
    if (emitter) {
      emitter.emit(
        "create",
        `Ensuring ${chalk.yellow(options.path)} directory.`,
        step
      );
    }
    await step;

    // This nested try catch avoids removing the directory
    // if it existed before running frontity.
    try {
      // 3. Creates `package.json`.
      step = createPackageJson(options);
      if (emitter) {
        emitter.emit(
          "create",
          `Creating ${chalk.yellow("package.json")}.`,
          step
        );
      }
      await step;

      // 4. Creates `frontity.settings`.
      const fileExtension = options.typescript ? "ts" : "js";
      step = createFrontitySettings(fileExtension, options);
      if (emitter) {
        emitter.emit(
          "create",
          `Creating ${chalk.yellow(`frontity.settings.${fileExtension}`)}.`,
          step
        );
      }
      await step;

      // 5. Clones `@frontity/mars-theme` inside `packages`.
      step = cloneStarterTheme(options);
      if (emitter) {
        emitter.emit("create", `Cloning ${chalk.green(options.theme)}.`, step);
      }
      await step;

      // 6. Installs dependencies.
      step = installDependencies(options);
      if (emitter) {
        emitter.emit("create", `Installing dependencies.`, step);
      }
      await step;

      if (emitter) {
        emitter.emit(
          "create",
          `${chalk.bold(
            "\nFrontity project created"
          )}\n\nYou can start development with ${chalk.bold.green(
            "frontity dev"
          )}\nFor documentation visit ${chalk.underline.magenta(
            "https://docs.frontity.org/"
          )}\n`
        );
      }
    } catch (error) {
      await revertProgress(options);
      throw error;
    }
  } catch (error) {
    const message = `${chalk.bold.red("Error: ")}${chalk.red(error.message)}`;

    if (emitter) emitter.emit("create", message);
    else console.error(message);
  }
};
