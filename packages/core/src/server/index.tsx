import { resolve } from "path";
import Koa from "koa";
import { get } from "koa-route";
import React from "react";
import { renderToString } from "react-dom/server";
import template from "./template";
import App from "../app";
import { ChunkExtractor } from "@loadable/server";

const app = new Koa();

app.use(async (ctx, next) => {
  // @ts-ignore
  const stats = await import("../../build/static/loadable-stats.json");
  const extractor = new ChunkExtractor({ stats });
  const jsx = extractor.collectChunks(<App />);
  const html = renderToString(jsx);
  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();
  ctx.body = template({ html, scriptTags, linkTags });
  next();
});

app.use(get("/robots.txt", ctx => (ctx.body = "Disallow")));

export default () => app.callback();
