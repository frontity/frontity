import { Middleware, Next } from "koa";
import { Context } from "@frontity/types";
import { getSettings } from "@frontity/file-settings";
import createStore from "../store";
import { appComponent } from "./capabilities/app-component";
import { renderMethod } from "./capabilities/render-method";
import { template } from "./capabilities/template";

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
  const settings = (ctx.state.settings = await getSettings({
    url: ctx.href,
    name,
  }));

  // Create the store.
  const store = (ctx.state.store = createStore({
    settings: settings,
    packages,
    url: ctx.URL,
  }));

  // Apply the capabilities to the store.libraries.frontity namespce.
  appComponent(store.libraries.frontity, ctx);

  // Setup the render method.
  renderMethod(store.libraries.frontity);

  // Define the default template.
  template(store.libraries.frontity);

  // Run init actions.
  await Promise.all(
    Object.values(store.actions).map(({ init }) => {
      if (init) return init();
    })
  );

  // Run beforeSSR actions.
  await Promise.all(
    Object.values(store.actions).map(({ beforeSSR }) => {
      if (beforeSSR) return beforeSSR({ ctx });
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
