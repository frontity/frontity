import { resolve } from "path";
import { prompt, Question } from "inquirer";
import create from "../functions/create";
import emitter from "../emitter";
import { CreateOptions } from "../types";

export default async (name: string, { typescript, useCwd }) => {
  const options: CreateOptions = {};

  if (!name) {
    const questions: Question[] = [
      {
        name: "name",
        type: "input",
        message: "Enter a name for the project:",
        filter: (input: string) => input.replace(/[\s_-]+/g, "-").toLowerCase()
      },
      {
        name: "packages",
        type: "input",
        message: "Enter a list of Frontity packages to install:",
        default: "frontity, @frontity/file-settings",
        filter: (input: string) => input.split(/[\s,]+/)
      }
    ];
    const answers = await prompt(questions);
    options.name = answers.name;
    options.packages = answers.packages;
  } else {
    options.name = name;
  }

  options.typescript = typescript;
  options.path = useCwd ? process.cwd() : resolve(process.cwd(), options.name);

  emitter.on("create", console.log);

  create(options);
};
