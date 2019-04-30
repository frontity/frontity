import { EventEmitter } from "events";
import ora from "ora";
import subscribe from "../functions/subscribe";
import { errorLogger } from "../utils";

export default async (email: string) => {
  const emitter = new EventEmitter();

  emitter.on("error", errorLogger);
  emitter.on("subscribe", (message, action) => {
    if (action) ora.promise(action, message);
    else console.log(message);
  });

  await subscribe(email, emitter);
};
