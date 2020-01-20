import { EventPromised } from "../utils/eventPromised";
import { subscribe } from "../steps";

// TODO:  make param an object
const subscribeCommand = async (
  email: string,
  emit: (event: string, ...value: any[]) => void
) => {
  try {
    emit("cli:subscribe:message", "Subscribing to frontity");
    await subscribe(email);
  } catch (error) {
    emit("cli:subscribe:error", error);
  }
};

export default (email: string) =>
  // EventPromised is a combination of EventEmitter and Promise
  new EventPromised((resolve, error, emit) => {
    subscribeCommand(email, emit).then(() => resolve(true));
  });
