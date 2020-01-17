import ora from "ora";
import chalk from "chalk";
import { errorLogger } from "../utils";
import subscribe from "../commands/subscribe";

export default async ({ email }: { email: string }) => {
  const emitter = subscribe(email);

  emitter.on("cli:subscribe:error", errorLogger);
  emitter.on("cli:subscribe", (message, action) => {
    if (action) ora.promise(action, message);
    else console.log(message);
  });

  // Actually subsribe the user
  await emitter;

  console.log(`${chalk.bold("\nThanks for subscribing to our newsletter!")}
      \nIf you have any doubts, join our community at ${chalk.underline.magenta(
        "https://community.frontity.org/"
      )}.\n`);
};
