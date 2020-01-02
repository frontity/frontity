import { prompt, Question } from "inquirer";
import { Options } from "../steps/create/types";

const options: Options = {};

export const askQuestion = async () => {
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
};
