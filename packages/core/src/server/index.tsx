import Koa from "koa";
import { get } from "koa-route";
import serve from "koa-static";
import mount from "koa-mount";
import React from "react";
import { renderToString } from "react-dom/server";
import template from "./template";
import App from "../app";
import { ChunkExtractor } from "@loadable/server";
import { getSettings } from "@frontity/file-settings";
// @ts-ignore - This is a dynamic generated file that cannot be analyzed by TS.
import stats from "build/bundling/client-chunks.json";

export default ({ packages }) => {
  const app = new Koa();

  // Serve static files.
  app.use(mount("/static", serve("./build/static")));

  // Frontity server rendering.
  app.use(async (ctx, next) => {
    // Get settings
    const settings = await getSettings({ url: ctx.href, name: ctx.query.name });

    const extractor = new ChunkExtractor({
      stats,
      entrypoints: [settings.name]
    });
    const jsx = extractor.collectChunks(<App />);
    const html = renderToString(jsx);
    const scriptTags = extractor.getScriptTags();
    const linkTags = extractor.getLinkTags();
    ctx.body = template({ html, scriptTags, linkTags });
    next();
  });

  // Default robots.txt.
  app.use(
    get("/robots.txt", ctx => {
      ctx.type = "text/plain";
      ctx.body = "User-agent: *\nDisallow:";
    })
  );
  return app.callback();
};
