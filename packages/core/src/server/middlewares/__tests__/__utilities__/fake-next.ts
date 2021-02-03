import { Next } from "koa";

/**
 * The fake next like method.
 */
export const fakeNext: Next = async () => {
  await Promise.resolve();
};
