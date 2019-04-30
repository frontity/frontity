import fetch from "node-fetch";
import { EventEmitter } from "events";
import chalk from "chalk";

const isEmailValid = (email: string): boolean =>
  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/i.test(email);

export default async (email: string, emitter?: EventEmitter) => {
  const emit = (message: string, step?: Promise<any>) => {
    if (emitter) emitter.emit("subscribe", message, step);
  };

  let step: Promise<any>;

  try {
    if (!isEmailValid(email))
      throw new Error("Email not valid. Please enter a valid email.");

    step = fetch(
      "https://hook.integromat.com/gm0b502jo5acuhzko7gszx0kd9r52ofi",
      {
        method: "POST",
        body: JSON.stringify({
          event: "frontity-subscribe",
          email: email.toLowerCase()
        }),
        headers: { "Content-Type": "application/json" }
      }
    );
    emit("Subscribing to Frontity", step);
    await step;

    emit(
      `${chalk.bold("\nThanks for subscribing to our newsletter!")}
      \nYou can also visit our community at ${chalk.underline.magenta(
        "https://community.frontity.org/"
      )}.\n`
    );
  } catch (error) {
    if (emitter) emitter.emit("error", error);
    else throw error;
  }
};
