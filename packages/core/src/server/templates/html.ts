import { Template } from "../../../types";

const template: Template = ({ html, frontity, head }) => `<!doctype html>
    <html ${head.htmlAttributes}>
      <head>
        <meta charset="utf-8">
        <meta name="generator" content="Frontity">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${head.title}
        ${head.meta}
        ${head.link}
        ${head.script}
        ${head.noscript}
        ${head.style}
        ${frontity.link}
        ${frontity.style}
      </head>
      <body ${head.bodyAttributes}>
        <div id="root">${html}</div>
        ${frontity.script}
      </body>
    </html>`;

export default template;
