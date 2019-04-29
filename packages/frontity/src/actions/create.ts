import { resolve } from "path";
import ora from "ora";
import { prompt, Question } from "inquirer";
import create from "../functions/create";
import { errorLogger } from "../utils";
import { EventEmitter } from "events";
import { Options } from "../functions/create/types";

export default async (name: string, { typescript, useCwd }) => {
  const options: Options = {};

  if (!name) {
    const questions: Question[] = [
      {
        name: "name",
        type: "input",
        message: "Enter a name for the project:",
        default: "my-frontity-project"
      },
      {
        name: "theme",
        type: "input",
        message: "Enter a starter theme to clone:",
        default: "@frontity/mars-theme"
      }
    ];

    const answers = await prompt(questions);
    options.name = answers.name;
    options.packages = answers.packages;
    options.theme = answers.theme;
    console.log();
  } else {
    options.name = name;
  }

  options.typescript = typescript;
  options.path = useCwd ? process.cwd() : resolve(process.cwd(), options.name);

  const emitter = new EventEmitter();

  emitter.on("error", errorLogger);
  emitter.on("create", (message, action) => {
    if (action) ora.promise(action, message);
    else console.log(message);
  });

  await create(options, emitter);
};
