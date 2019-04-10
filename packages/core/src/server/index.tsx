import Koa from "koa";
import { get } from "koa-route";
import serve from "koa-static";
import mount from "koa-mount";
import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { getSettings } from "@frontity/file-settings";
import { ChunkExtractor } from "@loadable/server";
import getTemplate from "./templates";
import { getStats, hasEntryPoint, getBothScriptTags } from "./utils/stats";
import App from "../app";

export default ({ packages }) => {
  const app = new Koa();

  // Serve static files.
  app.use(mount("/static", serve("./build/static")));

  // Frontity server rendering.
  app.use(async (ctx, next) => {
    // Get settings.
    const settings = await getSettings({ url: ctx.href, name: ctx.query.name });

    // @ts-ignore – Get module chunk stats.
    const moduleStats = await getStats({ target: "module" });
    // @ts-ignore – Get es5 chunk stats.
    const es5Stats = await getStats({ target: "es5" });
    // If present, module is the main chunk. This means that we can only
    // use es5 for HMR if module is not present.
    const stats = moduleStats || es5Stats;

    // Get the correct template or html if none is found.
    const template = getTemplate({ mode: settings.mode });

    // If there's no client stats or there is no client entrypoint for the site we
    // want to load, we don't extract scripts.
    if (stats && hasEntryPoint({ stats, site: settings.name })) {
      // Run renderToString with ChunkExtractor to get the html.
      const extractor = new ChunkExtractor({
        stats,
        entrypoints: [settings.name]
      });
      const jsx = extractor.collectChunks(<App />);
      const html = renderToString(jsx);

      debugger;

      // Get the linkTags.
      const linkTags = extractor.getLinkTags();

      // If we have both module and es5, do the type="module" dance:
      // https://jakearchibald.com/2017/es-modules-in-browsers/
      const scriptTags =
        moduleStats && es5Stats
          ? getBothScriptTags({ extractor, moduleStats, es5Stats })
          : extractor.getScriptTags();

      // Write the template to body.
      ctx.body = template({ html, scriptTags, linkTags });
    } else {
      // No client chunks: no scripts. Just do SSR. Use renderToStaticMarkup
      // because no hydratation will happen in the client.
      const html = renderToStaticMarkup(<App />);
      ctx.body = template({ html });
    }

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
