import { EventPromised } from "../utils/eventPromised";
import { subscribe } from "../steps";

// TODO:  make param an object
const subscribeCommand = async (
  email: string,
  emit: (event: string, ...value: any[]) => void,
  reject: (reason: any) => void
) => {
  try {
    emit("message", "Subscribing to frontity");
    await subscribe(email);
  } catch (error) {
    reject(error);
  }
};

export default (email: string) =>
  // EventPromised is a combination of EventEmitter and Promise
  new EventPromised((resolve, reject, emit) => {
    subscribeCommand(email, emit, reject).then(() => resolve(true));
  });
