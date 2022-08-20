import type { Context } from "@frontity/types";
import type { Next, Middleware } from "koa";

/**
 * Initializes the Koa context.
 *
 * @param ctx - Koa context.
 * @param next - The next method.
 *
 * @returns The awaited next method.
 */
export const init = async (ctx: Context, next: Next): Promise<Middleware> => {
  if (!ctx.frontity) ctx.frontity = {};

  return await next();
};
