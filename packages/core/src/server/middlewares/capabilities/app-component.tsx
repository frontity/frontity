import { FilledContext } from "react-helmet-async";
import App from "../../../app";

/**
 * Defines the App to be used for rendering.
 *
 * @param store - The store.
 * @param ctx - Koa context.
 */
export const appComponent = (store, ctx) => {
  ctx.state.helmetContext = {} as FilledContext;

  // Set the App.
  store.libraries.frontity.App = function FrontityApp() {
    return <App store={store} helmetContext={ctx.state.helmetContext} />;
  };
};
