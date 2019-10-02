import chalk from "chalk";
import { EventEmitter } from "events";
import { Options } from "./types";
import {
  ensurePackageDir,
  createPackageJson,
  createSrcIndexJs,
  installPackage,
  revertProgress
} from "./steps";

//  Steps:
//    1.  create /packages/[name]/src folder
//    2.  add /packages/[name]/package.json file using template
//    3.  if [--typescript]
//    3.a.1  add /packages/[name]/src/index.ts file using template
//    3.a.2  add /packages/[name]/types.ts file using template
//    3.  else
//    3.b    add /packages/[name]/src/index.js file using template
//    4.  install package

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
    // 1.  create ./packages/[name] folder
    step = ensurePackageDir(options);
    emit(`Ensuring ${chalk.yellow(options.packagePath)} folder.`, step);
    dirExisted = await step;

    // 2. Creates `package.json`.
    step = createPackageJson(options);
    emit(`Adding ${chalk.yellow("package.json")}.`, step);
    await step;

    // 3. Creates `src/index.js`.
    step = createSrcIndexJs(options);
    emit(`Adding ${chalk.yellow("src/index.js")}.`, step);
    await step;

    // 4. Install package
    step = installPackage(options);
    emit(`Installing package ${chalk.yellow(options.name)}.`, step);
    await step;
  } catch (error) {
    if (typeof dirExisted !== "undefined") await revertProgress(options);
    if (emitter) emitter.emit("error", error);
    else throw error;
  }
};
