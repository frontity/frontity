import { Middleware, Next } from "koa";
import { Context } from "@frontity/types";
import getTemplate from "../templates";

/**
 * Defines the module stats for the current request.
 *
 * @param ctx - Koa context
 */
export const template = async (
  ctx: Context,
  next: Next
): Promise<Middleware> => {
  const { store, settings } = ctx.state;

  ctx.state.template = getTemplate({ mode: settings.mode });

  // Get the correct template or html if none is found.
  if (store.libraries.frontity.template) {
    // Get a reference for the previous, default html template.
    const defaultTemplate = ctx.state.template;

    // Define the new template method.
    ctx.state.template = (args: any) => {
      return store.libraries.frontity.template({ ...args, defaultTemplate });
    };
  }

  return await next();
};
