import chalk from "chalk";
import { emitter } from "../utils/eventEmitter";
import { Options } from "../steps/create/types";
import {
  normalizeOptions,
  ensureProjectDir,
  createPackageJson,
  createFrontitySettings,
  cloneStarterTheme,
  installDependencies,
  downloadFavicon,
  revertProgress
} from "../steps/create";

const defaultOptions: Options = {
  path: process.cwd(),
  typescript: false,
  packages: [
    // "@frontity/wp-source"
  ],
  theme: "@frontity/mars-theme"
};

const emit = (message: string, step?: Promise<void>) => {
  emitter.emit("cli:create:message", message, step);
};

export default async (passedOptions?: Options) => {
  let step: Promise<any>;
  let dirExisted: boolean;

  // 1. Parses and validates options.
  const options: Options = normalizeOptions(defaultOptions, passedOptions);
  const { name, theme, path, typescript } = options;

  process.on("SIGINT", async () => {
    if (typeof dirExisted !== "undefined")
      await revertProgress(dirExisted, path);
  });

  try {
    // 2. Ensures that the project dir exists and is empty.
    step = ensureProjectDir(path);
    emit(`Ensuring ${chalk.yellow(path)} directory.`, step);
    dirExisted = await step;

    // 3. Creates `package.json`.
    step = createPackageJson(name, theme, path);
    emit(`Creating ${chalk.yellow("package.json")}.`, step);
    await step;

    // 4. Creates `frontity.settings`.
    const extension = typescript ? "ts" : "js";
    step = createFrontitySettings(extension, name, path);
    emit(`Creating ${chalk.yellow(`frontity.settings.${extension}`)}.`, step);
    await step;

    // 5. Clones `@frontity/mars-theme` inside `packages`.
    step = cloneStarterTheme(theme, path);
    emit(`Cloning ${chalk.green(theme)}.`, step);
    await step;

    // 6. Installs dependencies.
    step = installDependencies(path);
    emit(`Installing dependencies.`, step);
    await step;

    // 7. Download favicon.
    step = downloadFavicon(path);
    emit(`Downloading ${chalk.yellow("favicon.ico")}.`, step);
    await step;
  } catch (error) {
    if (typeof dirExisted !== "undefined")
      await revertProgress(dirExisted, path);

    if (emitter) emitter.emit("cli:create:error", error);
    else throw error;
  }
};
