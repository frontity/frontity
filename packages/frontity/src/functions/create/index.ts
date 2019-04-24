import chalk from "chalk";
import { Options } from "./types";
import {
  normalizeOptions,
  ensureProjectDir,
  createPackageJson,
  createFrontitySettings,
  cloneStarterTheme,
  installDependencies,
  revertProgress
} from "./steps";

const defaultOptions: Options = {
  path: process.cwd(),
  typescript: false,
  packages: [
    // "@frontity/wp-source",
    // "@frontity/tiny-router"
  ],
  theme: "@frontity/mars-theme"
};

export default async (passedOptions?: Options) => {
  // 1. Parses and validates options.
  const options = normalizeOptions(defaultOptions, passedOptions);

  // This functions will emit an event if an emitter is passed in options.
  const emit = (message: string, step?: Promise<void>) => {
    if (options.emitter) options.emitter.emit("create", message, step);
  };

  let step: Promise<any>;
  let dirExisted: boolean;

  try {
    // 2. Ensures that the project dir exists and is empty.
    step = ensureProjectDir(options);
    emit(`Ensuring ${chalk.yellow(options.path)} directory.`, step);
    dirExisted = await step;

    try {
      // This nested try catch avoids removing the directory
      // on error if it existed before running frontity.

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

      emit(
        `${chalk.bold(
          "\nFrontity project created."
        )}\n\nYou can start development with ${chalk.bold.green(
          "frontity dev"
        )}.\nFor documentation please visit ${chalk.underline.magenta(
          "https://docs.frontity.org/"
        )}.\nIf you need help please visit ${chalk.underline.magenta(
          "https://community.frontity.org/"
        )}.\n`
      );
    } catch (error) {
      // Remove all files generated.
      await revertProgress(dirExisted, options);
      throw error;
    }
  } catch (error) {
    if (options.emitter) options.emitter.emit("error", error);
    else throw error;
  }
};
