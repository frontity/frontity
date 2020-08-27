import ora from "ora";
import chalk from "chalk";
import { errorLogger } from "../utils";
import subscribeCommand from "../commands/subscribe";
import { prompt, Question } from "inquirer";

/**
 * The options of the {@link subscribe} command.
 */
interface SubscribeOptions {
  /**
   * The email that will be subscribed to the newsletter service.
   *
   * It will be prompted if the CLI arg is missing.
   *
   * @example `name@domain.com`
   */
  email: string;
}

/**
 * The subscribe CLI command, usually run with `npx frontity subscribe`.
 *
 * It takes args from the CLI. Then, it runs the subscribe command
 * programatically.
 *
 * @param options - Defined in {@link SubscribeOptions}.
 */
const subscribe = async ({ email }: SubscribeOptions) => {
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
