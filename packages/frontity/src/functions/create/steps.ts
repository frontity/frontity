import { EOL } from "os";
import { resolve as resolvePath } from "path";
import { exec } from "child_process";
import { promisify } from "util";
import {
  ensureDir,
  readdir as readDir,
  readFile,
  writeFile,
  createWriteStream,
  remove,
  pathExists
} from "fs-extra";
import { extract } from "tar";
import fetch from "node-fetch";
import { mergeRight } from "ramda";
import { isPackageNameValid } from "../../utils";
import { Options, PackageJson } from "./types";

const allowedExistingContent = ["readme.md", "license", ".git", ".gitignore"];
const faviconUrl = "https://favicon.frontity.org/";

// This function normalizes and validates options.
export const normalizeOptions = (
  defaultOptions: Options,
  passedOptions: Options
): Options => {
  const options = mergeRight(defaultOptions, passedOptions);

  // Normalize and validate `name` option.
  options.name = options.name.replace(/[\s_-]+/g, "-").toLowerCase();

  if (!isPackageNameValid(options.name))
    throw new Error(
      "The name of the package is not valid. Please enter a valid one (only letters and dashes)."
    );

  return options;
};

// This function ensures the path and checks if it's empty or it's a new repo.
// Also returns a boolean indicating if the dir existed already.
export const ensureProjectDir = async ({ path }: Options): Promise<boolean> => {
  const dirExisted = await pathExists(path);

  if (dirExisted) {
    // Check if the directory is a new repo.
    const dirContent = await readDir(path);
    const notAllowedContent = dirContent.filter(
      content => !allowedExistingContent.includes(content.toLowerCase())
    );
    // If it's not, throw.
    if (notAllowedContent.length) {
      throw new Error("The directory passed to `create` function is not empty");
    }
  } else {
    await ensureDir(path);
  }

  return dirExisted;
};

// This function creates a `package.json` file.
export const createPackageJson = async ({ name, theme, path }: Options) => {
  const packages = [
    "frontity",
    "@frontity/core",
    "@frontity/file-settings",
    "@frontity/wp-source",
    "@frontity/tiny-router"
  ];

  // Add Frontity packages to the dependencies.
  const dependencies = (await Promise.all(
    packages.map(async pkg => {
      // Get the version of each package.
      const response = await fetch(`https://registry.npmjs.com/${pkg}`);
      const data = await response.json();
      const version = data["dist-tags"].latest;
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
  const filePath = resolvePath(path, "package.json");
  const fileData = `${JSON.stringify(packageJson, null, 2)}${EOL}`;
  await writeFile(filePath, fileData);
};

// This function creates a `frontity.settings` file.
export const createFrontitySettings = async (
  extension: string,
  { name, path }: Options
) => {
  const frontitySettings = {
    name,
    state: {
      frontity: {
        url: "https://test.frontity.io",
        title: "Test Frontity Blog",
        description: "Useful content for Frontity development"
      }
    },
    packages: [
      "@frontity/tiny-router",
      "@frontity/mars-theme",
      {
        name: "@frontity/wp-source",
        state: {
          source: {
            apiUrl: "https://test.frontity.io/wp-json"
          }
        }
      }
    ]
  };
  const fileTemplate = await readFile(
    resolvePath(__dirname, `../../../templates/settings-${extension}-template`),
    { encoding: "utf8" }
  );
  const filePath = resolvePath(path, `frontity.settings.${extension}`);
  const fileData = fileTemplate.replace(/\$([\w-]+)\$/g, (_match, key) => {
    if (key === "settings") return JSON.stringify(frontitySettings, null, 2);
  });
  await writeFile(filePath, fileData);
};

// This functions clones the starter theme.
export const cloneStarterTheme = async ({ theme, path }: Options) => {
  const packageJsonPath = resolvePath(path, "./package.json");
  const packageJson = JSON.parse(
    await readFile(packageJsonPath, { encoding: "utf8" })
  );
  const themePath = resolvePath(path, packageJson.dependencies[theme]);
  await ensureDir(themePath);
  if (!isPackageNameValid(theme))
    throw new Error("The name of the theme is not a valid npm package name.");
  await promisify(exec)(`npm pack ${theme}`, { cwd: themePath });
  const tarball = (await readDir(themePath)).find(file => /\.tgz$/.test(file));
  const tarballPath = resolvePath(themePath, tarball);
  await extract({ cwd: themePath, file: tarballPath, strip: 1 });
  await remove(tarballPath);
};

// This function installs the Frontity packages.
export const installDependencies = async ({ path }: Options) => {
  await promisify(exec)("npm install", { cwd: path });
};

// This function downlaods the favicon file.
export const downloadFavicon = async ({ path }: Options) => {
  await new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(faviconUrl);
      const fileStream = createWriteStream(resolvePath(path, "favicon.ico"));
      response.body.pipe(fileStream);
      fileStream.on("finish", resolve);
    } catch (error) {
      reject(error);
    }
  });
};

// This function removes the files and directories created
// with `frontity create`.
export const revertProgress = async (
  dirExisted: boolean,
  { path }: Options
) => {
  if (dirExisted) {
    const content = await readDir(path);
    const removableContent = content
      .filter(item => !allowedExistingContent.includes(item.toLowerCase()))
      .map(item => resolvePath(path, item));
    for (const content of removableContent) await remove(content);
  } else {
    await remove(path);
  }
};
