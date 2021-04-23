import { Middleware, Next } from "koa";
import { Context } from "@frontity/types";

/**
 * Catch and print errors and add a header in development.
 *
 * @param ctx - Koa context.
 * @param next - The next method.
 *
 * @returns The awaited next method.
 */
export const errorHandling = async (
  ctx: Context,
  next: Next
): Promise<Middleware> => {
  const _DEV_ = process.env.NODE_ENV !== "production";

  try {
    if (_DEV_) ctx.set("X-Frontity-Dev", "true");
    return await next();
  } catch (err) {
    if (_DEV_) {
      ctx.body = err.message;
      ctx.status = err.status || 500;
      ctx.app.emit("error", err, ctx);
    } else {
      throw new Error(err);
    }
  }
};
