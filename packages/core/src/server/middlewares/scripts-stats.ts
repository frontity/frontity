import { Middleware, Next } from "koa";
import { getStats } from "../utils/stats";
import { Context } from "@frontity/types";

/**
 * Defines the module stats for the current request.
 *
 * @param ctx - Koa context.
 * @param next - The next method.
 *
 * @returns The awaited next method.
 */
export const scriptsStats = async (
  ctx: Context,
  next: Next
): Promise<Middleware> => {
  // By using `Promise.all` we load both of the stats in parallel
  const [moduleStats, es5Stats] = await Promise.all([
    getStats({ target: "module" }),
    getStats({ target: "es5" }),
  ]);

  // Define a helper ctx property to be available for the rest of the middlewares.
  ctx.state.stats = { moduleStats, es5Stats };

  return await next();
};
