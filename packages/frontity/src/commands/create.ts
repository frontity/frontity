import chalk from "chalk";
import { Options } from "../steps/types";
import { EventPromised } from "../utils/eventEmitter";
import {
  normalizeOptions,
  ensureProjectDir,
  createPackageJson,
  createFrontitySettings,
  cloneStarterTheme,
  installDependencies,
  downloadFavicon,
  revertProgress
} from "../steps";

const defaultOptions: Options = {
  path: process.cwd(),
  typescript: false,
  packages: [
    // "@frontity/wp-source"
  ],
  theme: "@frontity/mars-theme"
};

const create = async (
  passedOptions: Options,
  emit: (event: string, ...value: any[]) => void
) => {
  let step: Promise<any>;
  let dirExisted: boolean;

  const emitMessage = (message: string, step?: Promise<void>) => {
    emit("cli:create:message", message, step);
  };

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
    emitMessage(`Ensuring ${chalk.yellow(path)} directory.`, step);
    dirExisted = await step;

    // 3. Creates `package.json`.
    step = createPackageJson(name, theme, path);
    emitMessage(`Creating ${chalk.yellow("package.json")}.`, step);
    await step;

    // 4. Creates `frontity.settings`.
    const extension = typescript ? "ts" : "js";
    step = createFrontitySettings(extension, name, path);
    emitMessage(
      `Creating ${chalk.yellow(`frontity.settings.${extension}`)}.`,
      step
    );
    await step;

    // 5. Clones `@frontity/mars-theme` inside `packages`.
    step = cloneStarterTheme(theme, path);
    emitMessage(`Cloning ${chalk.green(theme)}.`, step);
    await step;

    // 6. Installs dependencies.
    step = installDependencies(path);
    emitMessage(`Installing dependencies.`, step);
    await step;

    // 7. Download favicon.
    step = downloadFavicon(path);
    emitMessage(`Downloading ${chalk.yellow("favicon.ico")}.`, step);
    await step;
  } catch (error) {
    if (typeof dirExisted !== "undefined")
      await revertProgress(dirExisted, path);
    emit("cli:create:error", error);
  }
};

export default (options?: Options) =>
  new EventPromised(async (resolve, error, emit) => {
    await create(options, emit);
    console.log("hi");
    resolve();
  });
