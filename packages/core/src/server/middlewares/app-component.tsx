import { Middleware, Next } from "koa";
import { Context } from "@frontity/types";
import { FilledContext } from "react-helmet-async";
import App from "../../app";

/**
 * Defines the App to be used for rendering.
 *
 * @param ctx - Koa context.
 * @param next - The next method.
 *
 * @returns The await next.
 */
export const appComponent = async (
  ctx: Context,
  next: Next
): Promise<Middleware> => {
  const { store } = ctx.state;

  ctx.state.helmetContext = {} as FilledContext;

  ctx.state.App = function FrontityApp() {
    return <App store={store} helmetContext={ctx.state.helmetContext} />;
  };

  // Get the correct template or html if none is found.
  if (store.libraries.frontity.App) {
    const UserDefinedApp = store.libraries.frontity.App;
    const FrontityApp = ctx.state.App;
    ctx.state.App = function UserDefinedFrontityApp() {
      return <UserDefinedApp App={FrontityApp} />;
    };
  }

  return await next();
};
