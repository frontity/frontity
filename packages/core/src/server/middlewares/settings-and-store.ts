import { Middleware, Next } from "koa";
import { Context } from "@frontity/types";
import { getSettings } from "@frontity/file-settings";
import createStore from "../store";

/**
 * Setup the settings and defines the state store.
 *
 * @param packages - The frontity packages.
 */
export const settingsAndStore = (packages) => async (
  ctx: Context,
  next: Next
): Promise<Middleware> => {
  // Get settings.
  const settings = (ctx.state.settings = await getSettings({
    url: ctx.href,
    name: ctx.query.frontity_name,
  }));

  // Create the store.
  const store = (ctx.state.store = createStore({
    settings: settings,
    packages,
    url: ctx.URL,
  }));

  // Run init actions.
  await Promise.all(
    Object.values(store.actions).map(({ init }) => {
      if (init) return init();
    })
  );

  // Run beforeSSR actions.
  await Promise.all(
    Object.values(store.actions).map(({ beforeSSR }) => {
      if (beforeSSR) return beforeSSR({ ctx, libraries: store.libraries });
    })
  );

  // The beforeSSR actions for source packages (e.g. wp-source) can set a
  // redirection by calling `ctx.redirect()`. In that case, the `Location`
  // HTTP header will already be set and we can just return early.
  if ([301, 302, 307, 308].includes(ctx.status) && ctx.get("Location")) {
    return;
  }

  return await next();
};
