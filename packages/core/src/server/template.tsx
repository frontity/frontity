export default ({
  html,
  scriptTags,
  linkTags
}: {
  html: string;
  scriptTags: string;
  linkTags: string;
}) => `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="generator" content="Frontity">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        ${linkTags}
      </head>
      <body>
        <div id="root">${html}</div>
        ${scriptTags}
      </body>
    </html>`;
