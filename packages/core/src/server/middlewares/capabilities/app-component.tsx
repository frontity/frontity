import { FilledContext } from "react-helmet-async";
import App from "../../../app";

/**
 * Defines the App to be used for rendering.
 *
 * @param namespace - The namespace object.
 * @param ctx - Koa context.
 */
export const appComponent = (namespace, ctx) => {
  ctx.state.helmetContext = {} as FilledContext;

  // Set the App.
  namespace.App = function FrontityApp() {
    return (
      <App store={ctx.state.store} helmetContext={ctx.state.helmetContext} />
    );
  };
};
