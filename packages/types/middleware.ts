import { Next } from "koa";
import { Context } from "./action";

/**
 * Input for middlewares that destructure `ctx` and `next` from the first
 * argument.
 */
export interface MiddlewareProps {
  /**
   * Koa context.
   */
  ctx: Context;

  /**
   * Next function.
   */
  next: Next;
}

/**
 * Middleware that any Frontity package can export from `server`.
 *
 * @example
 * ```ts
 * // packages/my-package/src/server.js
 * import myPackage from "./client";
 * import serve from "koa-static"; // Node-only package.
 * import { get } from "koa-route"; // Node-only package.
 *
 * export default {
 *   ...myPackage,
 *   server: {
 *     myPackage: {
 *       // Serve the ads.txt using the /public/ads.txt file.
 *       adsTxt: get("/ads.txt", serve("./public"))),
 *     },
 *   },
 * };
 * ```
 */
export interface Middleware {
  (ctx: Context, next: Next): Promise<Middleware>;
  (props: MiddlewareProps): Promise<Middleware>;
}

export default Middleware;
