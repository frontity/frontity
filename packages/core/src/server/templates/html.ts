import { Template } from "../../../types";

/**
 * The template function to return the html.
 *
 * @param options - The options to compile the template with.
 *
 * @returns The compiled html with the options.
 */
const template: Template = ({
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

export default template;
