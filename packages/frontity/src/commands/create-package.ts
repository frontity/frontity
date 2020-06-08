import chalk from "chalk";
import { EventPromised } from "../utils/eventPromised";
import { join } from "path";

import {
  Options,
  createPackageJson,
  createSrcIndexJs,
  installPackage,
} from "../steps/create-package";

import { ensureProjectDir, revertProgress } from "../steps";

const createPackage = async (
  options: Options,
  emit: (event: string, ...value: any[]) => void,
  reject: (reason: any) => void
) => {
  const emitMessage = (message: string, step?: Promise<void>) => {
    emit("message", message, step);
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
    emitMessage(`Creating ${chalk.yellow(packagePath)} folder.`, step);
    dirExisted = await step;

    // 2. Creates `package.json`.
    step = createPackageJson(name, namespace, projectPath, packagePath);
    emitMessage(`Adding ${chalk.yellow("package.json")}.`, step);
    await step;

    // 3. Creates `src/index.js`.
    step = createSrcIndexJs(name, namespace, projectPath, packagePath);
    emitMessage(`Adding ${chalk.yellow("src/index.js")}.`, step);
    await step;

    // 4. Install package
    step = installPackage(projectPath, packagePath);
    emitMessage(`Installing package ${chalk.yellow(name)}.`, step);
    await step;
  } catch (error) {
    if (typeof dirExisted !== "undefined") {
      await revertProgress(dirExisted, packagePath);
    }
    reject(error);
  }
};

// Thanks to this the clients will get autocomplete on `.on()`
type EventTypes = "error" | "message";

export default (options?: Options) =>
  // EventPromised is a combination of EventEmitter and Promise
  new EventPromised<EventTypes>((resolve, reject, emit) => {
    createPackage(options, emit, reject).then(resolve);
  });
