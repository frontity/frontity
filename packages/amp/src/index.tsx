import { CacheProvider, warn } from "frontity";
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

const amp: AMP = {
  name: "@frontity/amp",
  state: {
    amp: {},
  },
  actions: {
    amp: {
      init: ({ libraries }) => {
        if (!libraries.html2react) {
          warn(
            `To use the @frontity/amp package you should first install the @frontity/html2react package and add it to your frontity.settings.js file. 
            Try running: npm i @frontity/html2react in your project or go to https://api.frontity.org/frontity-packages/features-packages/html2react for more information.`
          );
        }

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

          // Cleanup the head of scripts, but leave only the `amp-` based ones
          // because they are created by the AMP runtime or allowed to be added
          // by the user if containing the `amp-custom` attribute.
          const { tags, extraCss } = head.reduce(
            (out, tag) => {
              const isCss = /<style.*?>([\s\S]+?)<\/style>/gm.exec(tag);

              // Collect the css if there is any.
              if (isCss) {
                out.extraCss += isCss[1];
              }
              // Else capture all the script and link with as="script" tags.
              else if (/<?script/g.test(tag)) {
                // And if they contain the `amp-` specific markers keep them.
                if (/<?script.+?="amp-/g.test(tag)) {
                  out.tags.push(tag);
                }
              } else {
                // By default push the rest
                out.tags.push(tag);
              }

              return out;
            },
            { tags: [], extraCss: "" }
          );

          // Push the custom css style tag.
          tags.push(`<style amp-custom>${extraCss}${css}</style>`);

          return ampTemplate({
            ...rest,
            head: tags,
            html,
          });
        };
      },
    },
  },
  libraries: {
    html2react: {
      processors,
    },
  },
};

export default amp;
