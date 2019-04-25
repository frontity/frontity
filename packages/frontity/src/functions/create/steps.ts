import { EOL } from "os";
import { resolve } from "path";
import { promisify } from "util";
import { exec } from "child_process";
import {
  ensureDir,
  readdir as readDir,
  readFile,
  writeFile,
  remove
} from "fs-extra";
import { extract } from "tar";
import p from "phin";
import { mergeRight, uniq } from "ramda";
import { Options, PackageJson } from "./types";

// This function normalizes and validates options.
export const normalizeOptions = (
  defaultOptions: Options,
  passedOptions: Options
): Options => {
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
export const ensureProjectDir = async ({ path }: Options): Promise<boolean> => {
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
    }

    return true;
  }

  return false;
};

// This function creates a `package.json` file.
export const createPackageJson = async ({ name, packages, theme }: Options) => {
  const mandatoryPackages = [
    "frontity"
    // "@frontity/core",
  ];
  const finalPackages = uniq(mandatoryPackages.concat(packages));

  // Add Frontity packages to the dependencies.
  const dependencies = (await Promise.all(
    finalPackages.map(async pkg => {
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
export const createFrontitySettings = async (
  extension: string,
  { name, path, packages }: Options
) => {
  process.chdir(path);
  const frontitySettings = { name, packages };
  const fileTemplate = await readFile(
    resolve(__dirname, `../../templates/settings-${extension}-template`),
    { encoding: "utf8" }
  );
  const fileName = `frontity.settings.${extension}`;
  const fileData = fileTemplate.replace(/\$([\w-]+)\$/g, (_match, key) => {
    if (key === "settings") return JSON.stringify(frontitySettings, null, 2);
  });
  await writeFile(fileName, fileData);
};

// This functions clones the starter theme.
export const cloneStarterTheme = async ({ path, theme }: Options) => {
  process.chdir(path);
  const themePath = JSON.parse(
    await readFile("./package.json", { encoding: "utf8" })
  ).dependencies[theme];
  await ensureDir(themePath);
  process.chdir(themePath);
  await promisify(exec)(`npm pack ${theme}`);
  const tarball = (await readDir("./")).find(file => /\.tgz$/.test(file));
  await extract({ file: tarball, strip: 1 });
  await remove(tarball);
};

// This function installs the Frontity packages.
export const installDependencies = async ({ path }: Options) => {
  process.chdir(path);
  await promisify(exec)("npm install");
};

// This function removes the files and directories created
// with `frontity create`.
export const revertProgress = async (
  dirExisted: boolean,
  { path }: Options
) => {
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
