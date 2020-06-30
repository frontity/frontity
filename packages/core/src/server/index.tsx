/* eslint-disable @typescript-eslint/ban-ts-ignore, require-atomic-updates */
import Koa from "koa";
import { get } from "koa-route";
import serve from "koa-static";
import mount from "koa-mount";
import React from "react";
import htmlescape from "htmlescape";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { FilledContext } from "react-helmet-async";
import { getSettings } from "@frontity/file-settings";
import { Context } from "@frontity/types";
import { getSnapshot } from "@frontity/connect";
import { ChunkExtractor } from "@loadable/server";
import getTemplate from "./templates";
import {
  getStats,
  hasEntryPoint,
  getBothScriptTags,
  Extractor,
} from "./utils/stats";
import getHeadTags from "./utils/head";
import App from "../app";
import { FrontityTags } from "../../types";
import createStore from "./store";
import { exists } from "fs";
import { promisify } from "util";

export default ({ packages }): ReturnType<Koa["callback"]> => {
  const app = new Koa();

  // Serve static files.
  app.use(async (ctx, next) => {
    const moduleStats = await getStats({ target: "module" });
    const es5Stats = await getStats({ target: "es5" });
    const stats = moduleStats || es5Stats;

    const publicPath = stats
      ? // Remove domain from publicPath.
        stats.publicPath.replace(/^(?:https?:)?\/\/([^/])+/, "")
      : // Use the value by default.
        "/static";

    // Serve the static files.
    return mount(publicPath, serve("build/static"))(ctx, next);
  });

  // Serve robots.txt from root or default if it doesn't exists.
  app.use(
    get("/robots.txt", async (ctx, next) => {
      if (await promisify(exists)("./robots.txt")) {
        await serve("./")(ctx, next);
      } else {
        ctx.type = "text/plain";
        ctx.body = "User-agent: *\nAllow: /";
      }
    })
  );

  // Ignore HMR if not in dev mode or old browser open.
  const return404 = (ctx: Context) => {
    ctx.status = 404;
  };
  app.use(get("/__webpack_hmr", return404));
  app.use(get("/static/([a-z0-9]+\\.hot-update\\.json)", return404));

  // Return Frontity favicon for favicon.ico.
  app.use(get("/favicon.ico", serve("./")));

  // Serve ads.txt from root
  app.use(get("/ads.txt", serve("./")));

  // Frontity server rendering.
  app.use(async (ctx, next) => {
    // Get module chunk stats.
    const moduleStats = await getStats({ target: "module" });
    // Get es5 chunk stats.
    const es5Stats = await getStats({ target: "es5" });
    // If present, module is the main chunk. This means that we can only
    // use es5 for HMR if module is not present.
    const stats = moduleStats || es5Stats;

    // Get settings.
    const settings = await getSettings({ url: ctx.href, name: ctx.query.name });

    // Get the correct template or html if none is found.
    const template = getTemplate({ mode: settings.mode });

    // Init variables.
    let html = "";
    const frontity: FrontityTags = {};

    // Create the store.
    const store = createStore({ settings, packages, url: ctx.URL });

    // Run init actions.
    await Promise.all(
      Object.values(store.actions).map(({ init }) => {
        if (init) return init();
      })
    );

    // Run beforeSSR actions.
    await Promise.all(
      Object.values(store.actions).map(({ beforeSSR }) => {
        if (beforeSSR) return beforeSSR({ ctx });
      })
    );

    // Pass a context to HelmetProvider which will hold our state specific to each request.
    const helmetContext = {} as FilledContext;

    const Component = <App store={store} helmetContext={helmetContext} />;

    // If there's no client stats or there is no client entrypoint for the site we
    // want to load, we don't extract scripts.
    if (stats && hasEntryPoint({ stats, site: settings.name })) {
      // Run renderToString with ChunkExtractor to get the html.
      const extractor = new ChunkExtractor({
        stats,
        entrypoints: [settings.name],
      });
      const jsx = extractor.collectChunks(Component);
      html = renderToString(jsx);

      // Get the linkTags. Crossorigin needed for type="module".
      const crossorigin = moduleStats && es5Stats ? { crossorigin: "" } : {};
      frontity.link = extractor.getLinkTags(crossorigin);

      // If we have both module and es5, do the type="module" dance:
      // https://jakearchibald.com/2017/es-modules-in-browsers/
      //
      // @ts-ignore – Ignore Typescript until we have a proper public API:
      // https://github.com/smooth-code/loadable-components/pull/239#issuecomment-482501467
      const customExtractor = extractor as Extractor;
      frontity.script =
        moduleStats && es5Stats
          ? getBothScriptTags({
              extractor: customExtractor,
              moduleStats,
              es5Stats,
            })
          : extractor.getScriptTags();

      // Add mutations to our scripts.
      frontity.script = `<script id="__FRONTITY_CONNECT_STATE__" type="application/json">${htmlescape(
        getSnapshot(store.state)
      )}</script>\n${frontity.script}`;
    } else {
      // No client chunks: no scripts. Just do SSR. Use renderToStaticMarkup
      // because no hydratation will happen in the client.
      html = renderToStaticMarkup(Component);
    }

    // Get static head strings.
    const head = getHeadTags(helmetContext.helmet);

    // Write the template to body.
    ctx.body = template({ html, frontity, head });
    next();

    // Run afterSSR actions.
    Object.values(store.actions).forEach(({ afterSSR }) => {
      if (afterSSR) afterSSR();
    });
  });

  return app.callback();
};
