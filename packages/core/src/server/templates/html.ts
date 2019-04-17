import { Template } from "../../types";

const template: Template = ({ html, scriptTags, linkTags }) => `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="generator" content="Frontity">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <link data-react-helmet="true" rel="icon" href="https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-LZ-alQBwUYv-HkbN8zV%2Favatar.png?generation=1550494103714087&amp;alt=media"/>
        ${linkTags}
      </head>
      <body>
        <div id="root">${html}</div>
        ${scriptTags}
      </body>
    </html>`;

export default template;
