import chalk from "chalk";
import { EventEmitter } from "events";
import { Options } from "../steps/create-package/types";
import {
  ensurePackageDir,
  createPackageJson,
  createSrcIndexJs,
  installPackage,
  revertProgress,
  isDirNotEmpty
} from "../steps/create-package/steps";

export default async (options?: Options, emitter?: EventEmitter) => {
  // This functions will emit an event if an emitter is passed in options.
  const emit = (message: string, step?: Promise<void>) => {
    if (emitter) emitter.emit("create", message, step);
  };

  let step: Promise<any>;
  let dirExisted: boolean;

  process.on("SIGINT", async () => {
    if (typeof dirExisted !== "undefined") await revertProgress(options);
  });

  try {
    // 1. Make sure ./packages/[name] folder is empty.
    step = isDirNotEmpty(options);
    emit(
      `Checking if ${chalk.yellow(options.packagePath)} is not empty.`,
      step
    );
    const dirNotEmpty = await step;
    if (dirNotEmpty)
      throw new Error(`Folder "${options.packagePath}" must be empty.`);

    // 2. Create ./packages/[name] folder.
    step = ensurePackageDir(options);
    emit(`Creating ${chalk.yellow(options.packagePath)} folder.`, step);
    dirExisted = await step;

    // 3. Creates `package.json`.
    step = createPackageJson(options);
    emit(`Adding ${chalk.yellow("package.json")}.`, step);
    await step;

    // 4. Creates `src/index.js`.
    step = createSrcIndexJs(options);
    emit(`Adding ${chalk.yellow("src/index.js")}.`, step);
    await step;

    // 5. Install package
    step = installPackage(options);
    emit(`Installing package ${chalk.yellow(options.name)}.`, step);
    await step;
  } catch (error) {
    if (typeof dirExisted !== "undefined") await revertProgress(options);
    if (emitter) emitter.emit("error", error);
    else throw error;
  }
};
