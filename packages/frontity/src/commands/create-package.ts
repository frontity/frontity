import chalk from "chalk";
import { EventEmitter } from "events";
import {
  Options,
  createPackageJson,
  createSrcIndexJs,
  installPackage
} from "../steps/create-package";

import { ensureProjectDir, revertProgress } from "../steps";
import { join } from "path";

export default async (options?: Options, emitter?: EventEmitter) => {
  // This functions will emit an event if an emitter is passed in options.
  const emit = (message: string, step?: Promise<void>) => {
    if (emitter) emitter.emit("create", message, step);
  };

  let step: Promise<any>;
  let dirExisted: boolean;

  const { name, namespace, packagePath, projectPath } = options;

  process.on("SIGINT", async () => {
    if (typeof dirExisted !== "undefined")
      await revertProgress(dirExisted, packagePath);
  });

  try {
    // 1. Create ./packages/[name] folder.
    step = ensureProjectDir(join(packagePath, "src"));
    emit(`Creating ${chalk.yellow(packagePath)} folder.`, step);
    dirExisted = await step;

    // 2. Creates `package.json`.
    step = createPackageJson(name, namespace, projectPath, packagePath);
    emit(`Adding ${chalk.yellow("package.json")}.`, step);
    await step;

    // 3. Creates `src/index.js`.
    step = createSrcIndexJs(name, namespace, projectPath, packagePath);
    emit(`Adding ${chalk.yellow("src/index.js")}.`, step);
    await step;

    // 4. Install package
    step = installPackage(projectPath, packagePath);
    emit(`Installing package ${chalk.yellow(name)}.`, step);
    await step;
  } catch (error) {
    if (typeof dirExisted !== "undefined") {
      await revertProgress(dirExisted, packagePath);
    }
    if (emitter) emitter.emit("error", error);
    else throw error;
  }
};
