import { EventPromised } from "../utils/eventPromised";
import { subscribe } from "../steps";

/**
 * Subscribe to Frontity newsletter.
 *
 * @param email - The email to be subscribed.
 * @param emit - The eventEmitter to send messages.
 * @param reject - The promise reject method in case something goes wrong.
 */
const subscribeCommand = async (
  email: string,
  emit: (event: string, ...value: any[]) => void,
  reject: (reason: any) => void
) => {
  try {
    emit("message", "Subscribing to frontity");
    await subscribe();
  } catch (error) {
    reject(error);
  }
};

export default (email: string) =>
  // EventPromised is a combination of EventEmitter and Promise
  new EventPromised((resolve, reject, emit) => {
    subscribeCommand(email, emit, reject).then(() => resolve(true));
  });
