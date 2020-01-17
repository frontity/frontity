import { resolve } from "path";
import ora from "ora";
import chalk from "chalk";
import { prompt, Question } from "inquirer";
import create from "../commands/create";
import { subscribe } from "../steps";
import { errorLogger, log } from "../utils";
import { Options } from "../steps/types";

export default async ({ name, typescript, useCwd }) => {
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
    options.theme = answers.theme;
    log();
  } else {
    options.name = name;
  }

  options.typescript = typescript;
  options.path = useCwd ? process.cwd() : resolve(process.cwd(), options.name);

  // Get the emitter for `create`
  const emitter = create(options);
  emitter.on("error", errorLogger);
  emitter.on("message", (message, action) => {
    if (action) ora.promise(action, message);
    else log(message);
  });

  await emitter;

  log(chalk.bold("\nFrontity project created.\n"));

  const subscribeQuestions: Question[] = [
    {
      name: "subscribe",
      type: "confirm",
      message: "Do you want to receive framework updates by email?",
      default: false
    },
    {
      name: "email",
      type: "input",
      message: "Please, enter your email:",
      when: answers => answers.subscribe
    }
  ];
  const answers = await prompt(subscribeQuestions);

  if (answers.subscribe) {
    log();

    emitter.on("subscribe", (message, action) => {
      if (action) ora.promise(action, message);
      else log(message);
    });

    await subscribe(answers.email);

    log("\nThanks for subscribing! 😃");
  } else {
    log(
      `\nOk, that's fine! 😉\nYou can subscribe at any point with ${chalk.bold.green(
        "npx frontity subscribe <email>"
      )}.`
    );
  }

  log(
    `\nRun ${chalk.bold.green(
      `cd ${options.name} && npx frontity dev`
    )} and have fun! 🎉\n\nYou can find docs at ${chalk.underline.magenta(
      "https://docs.frontity.org/"
    )}.\nIf you have any doubts, join our community at ${chalk.underline.magenta(
      "https://community.frontity.org/"
    )}.\n`
  );
};
