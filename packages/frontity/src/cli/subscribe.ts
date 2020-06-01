import ora from "ora";
import chalk from "chalk";
import { errorLogger } from "../utils";
import subscribeCommand from "../commands/subscribe";
import { prompt, Question } from "inquirer";

const subscribe = async ({ email }: { email: string }) => {
  while (!email) {
    const subscribeQuestion: Question[] = [
      {
        name: "email",
        type: "input",
        message: "Please, enter your email:",
      },
    ];
    const answer = await prompt(subscribeQuestion);
    email = answer.email;
  }

  try {
    const emitter = subscribeCommand(email);
    emitter.on("message", (message, action) => {
      if (action) ora.promise(action, message);
      else console.log(message);
    });

    // Actually subsribe the user
    await emitter;
  } catch (error) {
    errorLogger(error);
  }

  console.log(`${chalk.bold("\nThanks for subscribing to our newsletter!")}
      \nIf you have any doubts, join our community at ${chalk.underline.magenta(
        "https://community.frontity.org/"
      )}.\n`);
};

export default subscribe;
