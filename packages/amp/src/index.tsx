import { CacheProvider } from "frontity";
import { renderToStaticMarkup } from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";
import ampTemplate from "./template";
import AMP from "../types";
import processors from "./processors";

/**
 * Emotion cache key.
 */
const CACHE_KEY = "css-amp";

/**
 * Remove a final `/amp` from a link.
 *
 * @param link - The link to be processed.
 *
 * @returns The same link but without the final `/amp`.
 */
export const removeAmp = (link: string): string =>
  link.replace(/\/amp\/?($|\?|#)/, "/");

export default {
  name: "@frontity/amp",
  actions: {
    amp: {
      init: ({ libraries }) => {
        // Add the AMP processors
        libraries.html2react.processors.concat(processors);

        if (libraries.source) {
          const { parse, stringify } = libraries.source;

          // Wrap libraries.source.parse.
          libraries.source.parse = (link) => {
            const { route, path, ...rest } = parse(link);
            return {
              route: removeAmp(route),
              path: removeAmp(path),
              ...rest,
            };
          };

          // Wrap libraries.source.stringify.
          libraries.source.stringify = ({ route, path, ...rest }) => {
            const routeOrPath = route || path || "/";
            return stringify({
              route: removeAmp(routeOrPath),
              path: removeAmp(routeOrPath),
              ...rest,
            });
          };

          // Wrap libraries.source.normalize.
          libraries.source.normalize = (link) =>
            libraries.source.stringify(libraries.source.parse(link));
        }
      },
      beforeSSR({ libraries }) {
        // Define the emotion css extraction one.
        libraries.frontity.render = ({ App, collectChunks }) => {
          const cache = createCache({ key: CACHE_KEY });
          const { extractCritical } = createEmotionServer(cache);

          const result = extractCritical(
            renderToStaticMarkup(
              collectChunks(
                <CacheProvider value={cache}>
                  <App />
                </CacheProvider>
              )
            )
          );

          return result;
        };

        // Define the emotion style tag with the render result.
        libraries.frontity.template = ({ result, head, ...rest }) => {
          const { css, html } = result;

          // Cleanup the head of scripts, but leave only the `amp-` based ones.
          head = head.filter((tag) => {
            if (/<?script.+?>/g.test(tag)) {
              return /<?script.+?amp-/g.test(tag);
            }
          });

          // Push the custom css style tag.
          head.push(`<style amp-custom>${css}</style>`);

          return ampTemplate({
            ...rest,
            head,
            html,
          });
        };
      },
    },
  },
} as AMP;
