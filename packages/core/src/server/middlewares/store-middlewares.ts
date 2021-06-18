import Koa, { Middleware, Next } from "koa";
import { Package, Context } from "@frontity/types";

/**
 * Add package-defined middlewares to the given Koa application.
 *
 * @remarks The `app` argument is passed until it is accesible in `ctx`.
 *
 * @param app - The Koa application.
 *
 * @returns The middleware function.
 */
export const storeMiddlewares =
  (app: Koa) =>
  async (ctx: Context, next: Next): Promise<Middleware> => {
    // Get the initialized store from the app context.
    const store: Package = ctx.state.store;

    // Iterate over all the middlewares that packages expose.
    Object.values(store.server).forEach((namespace) => {
      Object.values(namespace).forEach((middleware) => {
        // Register the middleware.
        app.use((ctx, next) => {
          // Middlewares should be able to get `ctx` and `next` directly as
          // arguments or destructure them from the first one.
          const ctxExtended = { ...ctx, ctx, next };
          return middleware(ctxExtended, next);
        });
      });
    });

    return await next();
  };
