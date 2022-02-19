import { EOL } from "os";
import { resolve as resolvePath } from "path";
import { execSync, exec } from "child_process";
import { promisify } from "util";
import {
  ensureDir,
  readdir as readDir,
  readFile,
  writeFile,
  createWriteStream,
  remove,
  pathExists,
  appendFileSync,
} from "fs-extra";
import { extract } from "tar";
import fetch from "node-fetch";
import { mergeRight } from "ramda";
import {
  isPackageNameValid,
  isThemeNameValid,
  fetchPackageVersion,
} from "../utils";
import { CreateCommandOptions, PackageJson } from "./types";

const allowedExistingContent = [
  "readme.md",
  "license",
  ".git",
  ".gitignore",
  ".ds_store",
];

const faviconUrl =
  "https://frontity.org/wp-content/plugins/frontity-favicon/favicon.ico";

/**
 * This function normalizes and validates options.
 *
 * @param defaultOptions - The default options. Defined in {@link
 * CreateCommandOptions}.
 * @param passedOptions - The options from the user. Defined in {@link
 * CreateCommandOptions}.
 *
 * @returns The final options, normalized. Defined in {@link
 * CreateCommandOptions}.
 */
export const normalizeOptions = (
  defaultOptions: CreateCommandOptions,
  passedOptions: CreateCommandOptions
): CreateCommandOptions => {
  const options = mergeRight(defaultOptions, passedOptions);

  // Normalize and validate `name` option.
  options.name = options.name.replace(/[\s_-]+/g, "-").toLowerCase();

  if (!isPackageNameValid(options.name))
    throw new Error(
      "The name of the package is not valid. Please enter a valid one (only letters and dashes)."
    );

  return options;
};

/**
 * This function ensures the path exists and checks if it's empty or it's a new
 * repo. Also returns a boolean indicating if the directory existed already.
 *
 * @param path - The path where the project will be installed.
 *
 * @returns A promise that resolves once the check has been made.
 */
export const ensureProjectDir = async (path: string): Promise<boolean> => {
  const dirExisted = await pathExists(path);

  if (dirExisted) {
    // Check if the directory is a new repo.
    const dirContent = await readDir(path);
    const notAllowedContent = dirContent.filter(
      (content) => !allowedExistingContent.includes(content.toLowerCase())
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

/**
 * Create a `package.json` file.
 *
 * @param name - The name of the project.
 * @param theme - The theme that will be cloned and installed locally.
 * @param path - The path where the file will be created.
 * @param typescript - Indicates if the typescript flag is active.
 */
export const createPackageJson = async (
  name: string,
  theme: string,
  path: string,
  typescript: boolean
) => {
  const packages = [
    "frontity",
    "@frontity/core",
    "@frontity/wp-source",
    "@frontity/tiny-router",
    "@frontity/html2react",
  ];

  // Add Frontity packages to the dependencies.
  const dependencies = (
    await Promise.all(
      packages.map(async (pkg) => {
        // Get the version of each package.
        const version = await fetchPackageVersion(pkg);
        return [pkg, `^${version}`];
      })
    )
  ).reduce((final, current) => {
    // Reduce the packages into a dependecies object.
    final[current[0]] = current[1];
    return final;
  }, {});

  // Add the starter theme to the dependencies.
  const themeName = (theme.match(/\/?([\w-]+)$/) || ["", ""])[1];
  dependencies[theme] = `./packages/${themeName}`;
  const packageJson: PackageJson = {
    name,
    version: "1.0.0",
    private: true,
    description: "Frontity project",
    keywords: ["frontity"],
    engines: {
      node: ">=10.0.0",
      npm: ">=6.0.0",
    },
    scripts: {
      dev: "frontity dev",
      build: "frontity build",
      serve: "frontity serve",
    },
    prettier: {},
    dependencies,
  };

  // If the typescript flag is active, add the needed devDependencies.
  if (typescript) {
    const devPackages = ["@types/react", "@types/node-fetch"];
    const devDependencies = (
      await Promise.all(
        devPackages.map(async (pkg) => {
          // Get the version of each package.
          const version = await fetchPackageVersion(pkg);
          return [pkg, `^${version}`];
        })
      )
    ).reduce((final, current) => {
      // Reduce the packages into a dependecies object.
      final[current[0]] = current[1];
      return final;
    }, {});
    packageJson.devDependencies = devDependencies;
  }

  const filePath = resolvePath(path, "package.json");
  const fileData = `${JSON.stringify(packageJson, null, 2)}${EOL}`;
  await writeFile(filePath, fileData);
};

/**
 * Create a `README.md` file.
 *
 * @param name - The name of the project.
 * @param path - The path where the file will be created.
 */
export const createReadme = async (
  name: string,
  path: string
): Promise<void> => {
  const fileTemplate = await readFile(
    resolvePath(__dirname, "../../templates/README.md"),
    {
      encoding: "utf8",
    }
  );
  const filePath = resolvePath(path, "README.md");
  const fileData = fileTemplate.replace(/\$name\$/g, name);
  await writeFile(filePath, fileData);
};

/**
 * Create a `frontity.settings` file.
 *
 * @param extension - The extension of the file, either `.js` or `.ts`.
 * @param name - The name of the project.
 * @param path - The path where the file will be created.
 * @param theme - The theme installed in the project.
 */
export const createFrontitySettings = async (
  extension: string,
  name: string,
  path: string,
  theme: string
) => {
  const frontitySettings = {
    name,
    state: {
      frontity: {
        url: "https://test.frontity.org",
        title: "Test Frontity Blog",
        description: "WordPress installation for Frontity development",
      },
    },
    packages: [
      {
        name: theme,
        state: {
          theme: {
            menu: [
              ["Home", "/"],
              ["Nature", "/category/nature/"],
              ["Travel", "/category/travel/"],
              ["Japan", "/tag/japan/"],
              ["About Us", "/about-us/"],
            ],
            featured: {
              showOnList: false,
              showOnPost: false,
            },
          },
        },
      },
      {
        name: "@frontity/wp-source",
        state: {
          source: {
            url: "https://test.frontity.org",
          },
        },
      },
      "@frontity/tiny-router",
      "@frontity/html2react",
    ],
  };
  const fileTemplate = await readFile(
    resolvePath(__dirname, `../../templates/settings-${extension}-template`),
    { encoding: "utf8" }
  );
  const filePath = resolvePath(path, `frontity.settings.${extension}`);
  const fileData = fileTemplate.replace(/\$([\w-]+)\$/g, (_match, key) => {
    if (key === "settings") return JSON.stringify(frontitySettings, null, 2);
    if (key === "theme") return theme;
  });
  await writeFile(filePath, fileData);
};

/**
 * Create a `tsconfig.json` file.
 *
 * @param path - The path where the file will be created.
 */
export const createTsConfig = async (path: string) => {
  const fileTemplate = await readFile(
    resolvePath(__dirname, "../../templates/tsconfig.json"),
    {
      encoding: "utf8",
    }
  );
  const filePath = resolvePath(path, "tsconfig.json");
  await writeFile(filePath, fileTemplate);
};

/**
 * Clone the starter theme.
 *
 * @param theme - The name of the theme.
 * @param path - The path where it needs to be installed.
 */
export const cloneStarterTheme = async (theme: string, path: string) => {
  const packageJsonPath = resolvePath(path, "./package.json");
  const packageJson = JSON.parse(
    await readFile(packageJsonPath, { encoding: "utf8" })
  );
  const themePath = resolvePath(path, packageJson.dependencies[theme]);
  await ensureDir(themePath);
  if (!isThemeNameValid(theme))
    throw new Error("The name of the theme is not a valid npm package name.");
  await promisify(exec)(`npm pack ${theme}`, { cwd: themePath });
  const tarball = (await readDir(themePath)).find((file) =>
    /\.tgz$/.test(file)
  );
  const tarballPath = resolvePath(themePath, tarball);
  await extract({ cwd: themePath, file: tarballPath, strip: 1 });
  await remove(tarballPath);
};

/**
 * Install the Frontity packages.
 *
 * @param path - The location where `npm install` should be run.
 */
export const installDependencies = async (path: string) => {
  await promisify(exec)("npm install", { cwd: path });
};

/**
 * Downlaod the favicon file.
 *
 * @param path - The path where the favicon should be downloaded.
 */
export const downloadFavicon = async (path: string) => {
  const response = await fetch(faviconUrl);
  const fileStream = createWriteStream(resolvePath(path, "favicon.ico"));
  response.body.pipe(fileStream);
  await new Promise((resolve) => fileStream.on("finish", resolve));
};

/**
 * Initializes a new git repository.
 *
 * @param path - The path where git should be initialized.
 */
export const initializeGit = async (path: string) => {
  try {
    execSync("git init", { cwd: path, stdio: "ignore" });
    execSync("git add .", { cwd: path, stdio: "ignore" });
    execSync('git commit -m "Initialized with Frontity"', {
      cwd: path,
      stdio: "ignore",
    });
  } catch (e) {
    // If there is any issue we want to revert to "pre-git" state
    await remove(resolvePath(path, ".git"));

    // Rethrow the error so that it can be caught by the `create` command.
    throw e;
  }
};

/**
 * Creates a .gitignore file.
 *
 * @param path - The path where .gitignore file should be created.
 * @returns - A promise which resolves with a cleanup function which
 * should be called if any subsequent step fails.
 */
export const createGitignore = async (path: string) => {
  const fileTemplate = await readFile(
    resolvePath(__dirname, "../../templates/gitignore-template"),
    {
      encoding: "utf8",
    }
  );

  const gitignorePath = resolvePath(path, ".gitignore");
  const gitignoreExists = await pathExists(gitignorePath);

  if (gitignoreExists) {
    // Keep the existing .gitignore in memory in case we need to revert to it later.
    const backupGitignore = await readFile(gitignorePath, {
      encoding: "utf8",
    });

    // Append if there's already a `.gitignore` file
    appendFileSync(gitignorePath, "node_modules\nbuild");

    // Return a "cleanup" function
    return async () => {
      await writeFile(gitignorePath, backupGitignore);
    };
  } else {
    await writeFile(gitignorePath, fileTemplate);

    // Return a "cleanup" function
    return async () => {
      // Remove the .gitignore file
      await remove(gitignorePath);
    };
  }
};

/**
 * Remove the files and directories created with `frontity create` in case there
 * was a problem and we need to revert everything.
 *
 * @param dirExisted - If the directory existed already.
 * @param path - The path of the direcotry.
 */
export const revertProgress = async (dirExisted: boolean, path: string) => {
  if (dirExisted) {
    const content = await readDir(path);
    const removableContent = content
      .filter((item) => !allowedExistingContent.includes(item.toLowerCase()))
      .map((item) => resolvePath(path, item));
    for (const content of removableContent) await remove(content);
  } else {
    await remove(path);
  }
};

/**
 * Check if an email is valid or not.
 *
 * @param email - The email to be checked.
 *
 * @returns True or false depending if the email is valid.
 */
// const isEmailValid = (email: string): boolean =>
//   /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/i.test(email);

/**
 * Subscribe an email to the newsletter service.
 *
 * @param email - The email to be subscribed.
 *
 * @returns The response of the subscription.
 */
export const subscribe = async () => {
  throw new Error("Frontity newsletter is currently disabled");
};
