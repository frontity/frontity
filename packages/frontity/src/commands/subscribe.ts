import { EventPromised } from "../utils/eventEmitter";
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

export default (email: string) => {
  const eventPromised = new EventPromised((resolve, error, emit) => {
    subscribeCommand(email, emit).then(() => resolve(true));
  });

  return eventPromised;
};
