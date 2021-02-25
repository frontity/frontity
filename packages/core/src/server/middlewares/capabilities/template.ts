import { Template } from "../../../../types";

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
        ${scripts ? scripts.join("\n") : ""}
      </body>
    </html>`;

/**
 * Defines the default template method.
 *
 * @param namespace - The namespace object.
 */
export const template = (namespace) => {
  /**
   * Define a set of head tags that will be used to compose the template.
   */
  namespace.head = [];

  /**
   * A set of scripts tags to be included in the body script.
   */
  namespace.scripts = [];

  // Define the new template method.
  namespace.template = html;
};
