import ora from "ora";
import chalk from "chalk";
import subscribe from "../steps/subscribe";
import { errorLogger } from "../utils";
import { emitter } from "../utils/eventEmitter";

export default async (email: string) => {
  emitter.on("cli:subscribe:error", errorLogger);
  emitter.on("cli:subscribe", (message, action) => {
    if (action) ora.promise(action, message);
    else console.log(message);
  });

  await subscribe(email);

  console.log(`${chalk.bold("\nThanks for subscribing to our newsletter!")}
      \nIf you have any doubts, join our community at ${chalk.underline.magenta(
        "https://community.frontity.org/"
      )}.\n`);
};
