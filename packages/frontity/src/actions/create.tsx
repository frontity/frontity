import { resolve } from "path";
import ora from "ora";
import chalk from "chalk";
import { prompt, Question } from "inquirer";
import create from "../functions/create";
import subscribe from "../functions/subscribe";
import { errorLogger } from "../utils";
import { EventEmitter } from "events";
import { Options } from "../functions/create/types";
import React from "react";
import { render, Box } from "ink";
import TextInput from "ink-text-input";

export const Create: React.FC<{ initialName?: string }> = ({ initialName }) => {
  const [name, setName] = React.useState(initialName || "");
  const [submit, setSubmit] = React.useState(false);
  return (
    <>
      <Box>Name of the app: {name}</Box>
      <Box>
        <Box marginRight={1}>Enter your query:</Box>
        <TextInput
          value={name}
          onChange={setName}
          onSubmit={() => setSubmit(true)}
        />
      </Box>
      {submit && <Box>Submitted!</Box>}
    </>
  );
};

export default (
  name: string,
  { typescript, useCwd }: { typescript: boolean; useCwd: boolean }
) => {
  render(<Create initialName={name} />);
};

const oldCreate = async (name: string, { typescript, useCwd }) => {
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

  console.log(chalk.bold("\nFrontity project created.\n"));

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
    console.log();

    emitter.on("subscribe", (message, action) => {
      if (action) ora.promise(action, message);
      else console.log(message);
    });

    await subscribe(answers.email, emitter);

    console.log("\nThanks for subscribing! 😃");
  } else {
    console.log(
      `\nOk, that's fine! 😉\nYou can subscribe at any point with ${chalk.bold.green(
        "npx frontity subscribe <email>"
      )}.`
    );
  }

  console.log(
    `\nRun ${chalk.bold.green(
      `cd ${options.name} && npx frontity dev`
    )} and have fun! 🎉\n\nYou can find docs at ${chalk.underline.magenta(
      "https://docs.frontity.org/"
    )}.\nIf you have any doubts, join our community at ${chalk.underline.magenta(
      "https://community.frontity.org/"
    )}.\n`
  );
};
