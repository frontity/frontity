import chalk from "chalk";
import { EventEmitter } from "events";
import { Options } from "./types";
import {
  normalizeOptions,
  ensureProjectDir,
  createPackageJson,
  createFrontitySettings,
  cloneStarterTheme,
  installDependencies,
  downloadFavicon,
  revertProgress
} from "./steps";

const defaultOptions: Options = {
  path: process.cwd(),
  typescript: false,
  packages: [
    // "@frontity/wp-source"
  ],
  theme: "@frontity/mars-theme"
};

export default async (passedOptions?: Options, emitter?: EventEmitter) => {
  // This functions will emit an event if an emitter is passed in options.
  const emit = (message: string, step?: Promise<void>) => {
    if (emitter) emitter.emit("create", message, step);
  };

  let options: Options;
  let step: Promise<any>;
  let dirExisted: boolean;

  process.on("SIGINT", async () => {
    if (typeof dirExisted !== "undefined")
      await revertProgress(dirExisted, options);
  });

  try {
    // 1. Parses and validates options.
    options = normalizeOptions(defaultOptions, passedOptions);

    // 2. Ensures that the project dir exists and is empty.
    step = ensureProjectDir(options);
    emit(`Ensuring ${chalk.yellow(options.path)} directory.`, step);
    dirExisted = await step;

    // 3. Creates `package.json`.
    step = createPackageJson(options);
    emit(`Creating ${chalk.yellow("package.json")}.`, step);
    await step;

    // 4. Creates `frontity.settings`.
    const extension = options.typescript ? "ts" : "js";
    step = createFrontitySettings(extension, options);
    emit(`Creating ${chalk.yellow(`frontity.settings.${extension}`)}.`, step);
    await step;

    // 5. Clones `@frontity/mars-theme` inside `packages`.
    step = cloneStarterTheme(options);
    emit(`Cloning ${chalk.green(options.theme)}.`, step);
    await step;

    // 6. Installs dependencies.
    step = installDependencies(options);
    emit(`Installing dependencies.`, step);
    await step;

    // 7. Download favicon.
    step = downloadFavicon(options);
    emit(`Downloading ${chalk.yellow("favicon.ico")}.`, step);
    await step;
  } catch (error) {
    if (typeof dirExisted !== "undefined")
      await revertProgress(dirExisted, options);

    if (emitter) emitter.emit("error", error);
    else throw error;
  }
};
