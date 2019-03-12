import { resolve } from "path";
import Koa from "koa";
import { get } from "koa-route";
import React from "react";
import { renderToString } from "react-dom/server";
import template from "./template";
import App from "../app";
import { ChunkExtractor } from "@loadable/server";
// @ts-ignore
import stats from "../../build/static/client-chunks.json";

const app = new Koa();

app.use(async (ctx, next) => {
  const extractor = new ChunkExtractor({ stats });
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

export default app.callback();
