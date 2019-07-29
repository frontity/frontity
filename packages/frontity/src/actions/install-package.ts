import { resolve } from "path";
import ora from "ora";
import chalk from "chalk";
import { prompt, Question } from "inquirer";
// import installPackage from "../functions/install-package";
import { errorLogger } from "../utils";
import { EventEmitter } from "events";
import { Options } from "../functions/create/types";

export default async (name: string) => {
  const options: Options = {};

  if (!name) {
    console.log(
      `\nThis will install a local copy of a Frontity package from npm in your /packages folder, so you can modify it at will.\n`
    );

    const questions: Question[] = [
      {
        name: "name",
        type: "input",
        message: "Name of the Frontity package:",
        default: ""
      }
    ];

    const answers = await prompt(questions);
    options.name = answers.name;
    console.log();
  } else {
    options.name = name;
  }

  const emitter = new EventEmitter();

  emitter.on("error", errorLogger);
  emitter.on("create", (message, action) => {
    if (action) ora.promise(action, message);
    else console.log(message);
  });

  // await create(options, emitter);

  console.log(
    chalk.bold(
      `\nThe package ${chalk.bold.green(
        options.name
      )} has been successfully installed in your ${chalk.bold.green(
        "/packages"
      )} folder. Now you can add it to your site using ${chalk.bold.green(
        "frontity.settings.js"
      )} and modify it at your will.`
    )
  );

  console.log(
    `\n\nYou can find docs at ${chalk.underline.magenta(
      "https://docs.frontity.org/"
    )}.\nIf you have any questions, join our community at ${chalk.underline.magenta(
      "https://community.frontity.org/"
    )}.\n`
  );
};
