import { Middleware, Next } from "koa";
import { Context } from "@frontity/types";
import { renderToStaticMarkup, renderToString } from "react-dom/server";

/**
 * The default serializer. Handles the case where there are no entrypoints.
 *
 * @param args - The arguments to be used for this pass.
 *
 * @returns The function to serialize with.
 */
const serialize = ({ collectChunks, hasEntryPoint }: any) => (jsx: any) => {
  if (!hasEntryPoint) {
    return renderToStaticMarkup(jsx);
  }

  return renderToString(collectChunks(jsx));
};

/**
 * The render method for a given React App.
 *
 * @param args - The arguments to be used for render.
 *
 * @returns The serialized App.
 */
const render = ({ App, ...args }) => {
  return serialize(args)(<App />);
};

/**
 * Defines the module stats for the current request.
 *
 * @param ctx - Koa context.
 * @param next - The next method.
 *
 * @returns The awaited next.
 */
export const setupRenderMethod = async (
  ctx: Context,
  next: Next
): Promise<Middleware> => {
  const { store } = ctx.state;

  // Get the render method.
  ctx.state.render = render;

  // If the user has defined a custom render, used that and pass
  // along the default frontity renderer.
  if (store.libraries.frontity.render) {
    ctx.state.render = (args: any) => {
      return store.libraries.frontity.render({
        ...args,
        defaultRenderer: serialize(args),
      });
    };
  }

  return await next();
};
