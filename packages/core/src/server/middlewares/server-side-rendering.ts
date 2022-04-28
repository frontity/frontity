import { Middleware, Next } from "koa";
import { Context, Package } from "@frontity/types";
import htmlescape from "htmlescape";
import { getSnapshot, InitializedStore } from "@frontity/connect";
import { getBothScriptTags, hasEntryPoint } from "../utils/stats";
import getHeadTags from "../utils/head";
import { CustomChunkExtractor } from "../utils/custom-chunk-extractor";

/**
 * Helper to abstract the running of afterSSR actions.
 *
 * @param store - The Frontity state store.
 * @param ctx - The Koa context.
 */
async function runAfterSSRActions(
  store: InitializedStore<Package>,
  ctx: Context
) {
  await Promise.all(
    Object.values(store.actions).map(({ afterSSR }) => {
      if (afterSSR) return afterSSR(ctx);
    })
  );
}

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
  const { settings, store, helmetContext, stats: scriptStats } = ctx.frontity;

  // Get the defined render, template and App.
  const { render, template, App, head, scripts } = store.libraries.frontity;

  // Get module and es5 chunks stats.
  const { moduleStats, es5Stats } = scriptStats;

  // If present, module is the main chunk. This means that we can only use es5
  // for HMR if module is not present.
  const stats = moduleStats || es5Stats;

  // Init variables.
  const output = {
    result: "",
    head,
    scripts,
  };

  // If there's no client stats or there is no client entrypoint for the site
  // we want to load, we don't extract scripts.
  if (stats && hasEntryPoint({ stats, site: settings.name })) {
    // Run renderToString with ChunkExtractor to get the html.
    const extractor = new CustomChunkExtractor({
      stats,
      entrypoints: [settings.name],
      publicPath: store.state.frontity.options.publicPath,
    });

    // Call the render function with the wrapped App.
    output.result = render({
      App,
      collectChunks: extractor.collectChunks.bind(extractor),
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

    // Run afterSSR actions. It runs at this point because we want to run it
    // before taking the state snapshot. This gives the user a chance to
    // modify the state before sending it to the client
    await runAfterSSRActions(store, ctx);

    // Add mutations to our scripts.
    output.scripts.push(
      `<script id="__FRONTITY_CONNECT_STATE__" type="application/json">${htmlescape(
        getSnapshot(store.state)
      )}</script>`
    );

    // Add public path variable adding a trailing slash (needed to concat the path with the file name).
    output.scripts.push(
      `<script id="__FRONTITY_PUBLIC_PATH__" type="text/javascript">
        window["__FRONTITY_PUBLIC_PATH__"] = "${store.state.frontity.options.publicPath.replace(
          /\/?$/,
          "/"
        )}";
      </script>`
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

    // Run afterSSR actions.
    await runAfterSSRActions(store, ctx);

    output.result = render({ App });
  }

  // Get static head strings.
  const { head: helmetHead, ...rest } = getHeadTags(helmetContext.helmet);

  // Concat the helmet head tags with the already defined head.
  output.head = helmetHead.concat(output.head);

  // Write the template to body replacing the public path.
  ctx.body = template({ ...output, ...rest, html: output.result }).replace(
    /__webpack_public_path__/g,
    store.state.frontity.options.publicPath.replace(/(\/?)$/, "/")
  );

  return await next();
};
