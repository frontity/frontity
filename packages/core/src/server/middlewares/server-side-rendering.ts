import { Middleware, Next } from "koa";
import { Context } from "@frontity/types";
import htmlescape from "htmlescape";
import { getSnapshot } from "@frontity/connect";
import { ChunkExtractor } from "@loadable/server";
import { getBothScriptTags, hasEntryPoint } from "../utils/stats";
import getHeadTags from "../utils/head";

/**
 * Defines the module stats for the current request.
 *
 * @param ctx - Koa context.
 * @param next - The next method.
 *
 * @returns The awaited next method.
 */
export const serverSideRendering = async (
  ctx: Context,
  next: Next
): Promise<Middleware> => {
  // Get settings, template, store and stats.
  const {
    settings,
    store,
    template,
    helmetContext,
    render,
    stats: scriptStats,
  } = ctx.state;

  // Get module and es5 chunks stats.
  const { moduleStats, es5Stats } = scriptStats;

  // If present, module is the main chunk. This means that we can only use es5
  // for HMR if module is not present.
  const stats = moduleStats || es5Stats;

  // Init variables.
  const output = {
    result: "",
    head: [],
    scripts: [],
  };

  // If there's no client stats or there is no client entrypoint for the site
  // we want to load, we don't extract scripts.
  if (stats && hasEntryPoint({ stats, site: settings.name })) {
    // Run renderToString with ChunkExtractor to get the html.
    const extractor = new ChunkExtractor({
      stats,
      entrypoints: [settings.name],
    });

    // Call the render function with the wrapped App.
    output.result = render({
      ...ctx.state,
      collectChunks: extractor.collectChunks,
      hasEntryPoint: true,
    });

    // Get the linkTags. Crossorigin needed for type="module".
    const crossorigin = moduleStats && es5Stats ? { crossorigin: "" } : {};

    // Push the link tags.
    output.head.push(extractor.getLinkTags(crossorigin));

    // If we have both module and es5, do the type="module" dance:
    // https://jakearchibald.com/2017/es-modules-in-browsers/
    //
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore – Ignore Typescript until we have a proper public API:
    // https://github.com/smooth-code/loadable-components/pull/239#issuecomment-482501467
    const customExtractor = extractor as Extractor;

    // Add mutations to our scripts.
    output.scripts.push(
      `<script id="__FRONTITY_CONNECT_STATE__" type="application/json">${htmlescape(
        getSnapshot(store.state)
      )}</script>`
    );

    // Push the body scripts.
    output.scripts.push(
      moduleStats && es5Stats
        ? getBothScriptTags({
            extractor: customExtractor,
            moduleStats,
            es5Stats,
          })
        : extractor.getScriptTags()
    );
  } else {
    // No client chunks: no scripts. Just do SSR. Use renderToStaticMarkup
    // because no hydratation will happen in the client.
    output.result = render(ctx.state);
  }

  // Run afterSSR actions. It runs at this point because we want to run it
  // before taking the state snapshot. This gives the user a chance to
  // modify the state before sending it to the client
  await Promise.all(
    Object.values(store.actions).map(({ afterSSR }) => {
      if (afterSSR) return afterSSR({ ctx });
    })
  );

  // Get static head strings.
  const { head: helmetHead, ...rest } = getHeadTags(helmetContext.helmet);

  output.head = helmetHead.concat(output.head);

  // Write the template to body.
  ctx.body = template({ ...output, ...rest, html: output.result });

  return await next();
};
