import ora from "ora";
import chalk from "chalk";
import { normalize } from "path";
import { readdir as readDir } from "fs-extra";
import { prompt, Question } from "inquirer";
import createPackage from "../functions/create-package";
import { errorLogger } from "../utils";
import { EventEmitter } from "events";
import { Options } from "../functions/create-package/types";

//  Command:
//    create-package [name] [--typescript]
//
//  Steps:
//    1. validate project location
//    2. ask for the package name if it wasn't passed as argument and validate
//    3. ask for the package namespace if it wasn't passed as argument
//    4. create package

export default async (name: string, { namespace, typescript }) => {
  // Init options
  const options: Options = { typescript };

  // Init event emitter
  const emitter = new EventEmitter();
  emitter.on("error", errorLogger);
  emitter.on("create", (message, action) => {
    if (action) ora.promise(action, message);
    else console.log(message);
  });

  // 1. validate project location
  options.projectPath = process.cwd();
  const dirContent = await readDir(options.projectPath);
  const isFrontity = dirContent.some(content =>
    /^frontity\.settings\.(js|ts)$/i.test(content)
  );
  if (!isFrontity) {
    emitter.emit(
      "error",
      new Error("You must execute this command in a Frontity project")
    );
  }

  // 2. ask for the package name if it wasn't passed as argument and validate
  if (!name) {
    const questions: Question[] = [
      {
        name: "name",
        type: "input",
        message: "Enter a name for the package:",
        default: "my-frontity-package"
      }
    ];

    const answers = await prompt(questions);
    options.name = answers.name;
    console.log();
  } else {
    options.name = name;
  }

  // 2.1 set the package path
  options.packagePath = normalize(`packages/${options.name}`);

  // 3. ask for the package namespace if it wasn't passed as argument
  if (!namespace) {
    const questions: Question[] = [
      {
        name: "namespace",
        type: "input",
        message: "Enter the namespace of the package:",
        default: "theme"
      }
    ];

    const answers = await prompt(questions);
    options.namespace = answers.namespace;
    console.log();
  } else {
    options.namespace = namespace;
  }

  // 4. create package
  await createPackage(options, emitter);

  console.log(chalk.bold(`\nNew package "${options.name}" created.\n`));
};
