import Koa from "koa";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../app";

const app = new Koa();

app.use(ctx => {
  const html = renderToString(<App />);
  ctx.body = `<html><body>${html}</body></html>`;
});

export default () => app.callback();
