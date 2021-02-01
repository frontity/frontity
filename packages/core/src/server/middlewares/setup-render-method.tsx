import { Middleware, Next } from "koa";
import { Context } from "@frontity/types";
import { renderToStaticMarkup, renderToString } from "react-dom/server";

/**
 * The default serializer. Handles the case where there are no entrypoints.
 *
 * @param args
 * @returns The function to serialize with.
 */
const serialize = ({ collectChunks, hasEntryPoint }: any) => (jsx: any) => {
  if (!hasEntryPoint) {
    return renderToStaticMarkup(jsx);
  }

  return renderToString(collectChunks(jsx));
};

const render = ({ App, ...args }) => {
  return serialize(args)(<App />);
};

/**
 * Defines the module stats for the current request.
 *
 * @param ctx - Koa context
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
