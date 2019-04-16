import program from "commander";
import { cursorTo } from "readline";
import { prompt, Question } from "inquirer";
import { resolve } from "path";
import create from "./commands/create";
import emitter from "./emitter";
import { CreateOptions } from "./types";
import { version } from "../package.json";

export { create, emitter };

// Sets the version and the description of the program.
program.version(version).description("Frontity CLI");

// Registers a `create` command that takes an optional
// parameter called `name`. It also accepts the following
// options: --typescript, --use-cwd.
program
  .command("create [name]")
  .option("-t, --typescript", "Adds support for TypeScript")
  .option("-c, --use-cwd", "Generates the project in the current directory.")
  .description("Creates a new Frontity project.")
  .action(async (name: string, { typescript, useCwd }) => {
    const options: CreateOptions = {};

    if (!name) {
      const questions: Question[] = [
        {
          name: "name",
          type: "input",
          message: "Enter a name for the project:",
          filter: (input: string) =>
            input.replace(/[\s_-]+/g, "-").toLowerCase()
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
    options.path = useCwd
      ? process.cwd()
      : resolve(process.cwd(), options.name);

    emitter.on("create", console.log);

    create(options);
  });

program.parse(process.argv);
