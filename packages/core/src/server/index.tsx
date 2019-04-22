import Koa from "koa";
import { get } from "koa-route";
import serve from "koa-static";
import mount from "koa-mount";
import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { getSettings } from "@frontity/file-settings";
import { ChunkExtractor } from "@loadable/server";
import { extractCritical } from "emotion-server";
import { Helmet } from "react-helmet";
import getTemplate from "./templates";
import {
  getStats,
  hasEntryPoint,
  getBothScriptTags,
  Extractor
} from "./utils/stats";
import getNamespaces from "./utils/namespaces";
import getHeadTags from "./utils/head";
import App from "../app";
import { FrontityTags } from "../types";

export default ({ packages }) => {
  const app = new Koa();

  // Serve static files.
  app.use(mount("/static", serve("./build/static")));

  // Default robots.txt.
  app.use(
    get("/robots.txt", ctx => {
      ctx.type = "text/plain";
      ctx.body = "User-agent: *\nDisallow:";
    })
  );

  // Return 404 for favicon.ico.
  app.use(
    get("/favicon.ico", ctx => {
      ctx.throw(404);
    })
  );

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

    // Get the correct namespaces for this site.
    const namespaces = getNamespaces({ packages, settings });

    // Init variables.
    let html = "";
    const frontity: FrontityTags = {};

    // If there's no client stats or there is no client entrypoint for the site we
    // want to load, we don't extract scripts.
    if (stats && hasEntryPoint({ stats, site: settings.name })) {
      // Run renderToString with ChunkExtractor to get the html.
      const extractor = new ChunkExtractor({
        stats,
        entrypoints: [settings.name]
      });
      const jsx = extractor.collectChunks(<App namespaces={namespaces} />);
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
              es5Stats
            })
          : extractor.getScriptTags();
    } else {
      // No client chunks: no scripts. Just do SSR. Use renderToStaticMarkup
      // because no hydratation will happen in the client.
      html = renderToStaticMarkup(<App namespaces={namespaces} />);
    }

    // Emotion get CSS and IDs:
    const emotion = extractCritical(html);
    // Overwrite html with the version without styles in body.
    html = emotion.html;
    // Populate style with the CSS from Emotion.
    frontity.style = `<style amp-custom>${emotion.css}</style>`;
    // Insert the script for hydratation of Emotion in the script tags.
    frontity.script = `<script id="__EMOTION_HYDRATATION_IDS__" type="application/json">${JSON.stringify(
      emotion.ids
    )}</script>\n${frontity.script}`;

    // Get static head strings.
    const helmet = Helmet.renderStatic();
    const head = getHeadTags(helmet);

    // Write the template to body.
    ctx.body = template({ html, frontity, head });
    next();
  });

  return app.callback();
};
