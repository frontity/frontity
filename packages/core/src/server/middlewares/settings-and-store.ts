import type { Middleware, Next } from "koa";
import type { Context } from "@frontity/types";
import { getSettings } from "@frontity/file-settings";
import createStore from "../store";

/**
 * Setup the settings and defines the state store.
 *
 * @param packages - The frontity packages.
 *
 * @returns The middleware function.
 */
export const settingsAndStore = (packages) => async (
  ctx: Context,
  next: Next
): Promise<Middleware> => {
  // Get the settings name from the query. In the case the `name` option is an
  // array, the last value is used.
  const nameOption = ctx.query.frontity_name;
  const name = Array.isArray(nameOption)
    ? nameOption[nameOption.length - 1]
    : nameOption;

  // Get settings.
  ctx.state.settings = await getSettings({
    url: ctx.href,
    name,
  });

  // Create the store.
  ctx.state.store = createStore({
    settings: ctx.state.settings,
    packages,
    url: ctx.URL,
  });

  return await next();
};
