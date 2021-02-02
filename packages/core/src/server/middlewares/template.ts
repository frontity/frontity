import { Middleware, Next } from "koa";
import { Context } from "@frontity/types";
import { Template } from "../../../types";

/**
 * The template function to return the html.
 *
 * @param options - The options to compile the template with.
 *
 * @returns The compiled html with the options.
 */
const html: Template = ({
  html,
  scripts,
  head,
  htmlAttributes,
  bodyAttributes,
}) => `<!doctype html>
    <html ${htmlAttributes || ""}>
      <head>
        <meta charset="utf-8">
        <meta name="generator" content="Frontity">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${head ? head.join("\n") : ""}
      </head>
      <body ${bodyAttributes || ""}>
        <div id="root">${html}</div>
        ${scripts.join("\n") || ""}
      </body>
    </html>`;

/**
 * Defines the module stats for the current request.
 *
 * @param ctx - Koa context.
 * @param next - The next method.
 *
 * @returns The awaited next mehtod.
 */
export const template = async (
  ctx: Context,
  next: Next
): Promise<Middleware> => {
  const { store } = ctx.state;

  ctx.state.template = html;

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
