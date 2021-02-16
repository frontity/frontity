import { CacheProvider } from "frontity";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";
import config, { CACHE_KEY } from "./config";
import AMP from "../types";

export default {
  ...config,
  actions: {
    amp: {
      ...config.actions.amp,
      beforeSSR({ libraries }) {
        // Grab a copy of the previous render method.
        const render = libraries.frontity.render;

        // Define the emotion css extraction one.
        libraries.frontity.render = ({ App, ...rest }) => {
          const cache = createCache({ key: CACHE_KEY });
          const { extractCritical } = createEmotionServer(cache);

          const result = extractCritical(
            render({
              ...rest,
              App: function Wrapped() {
                return (
                  <CacheProvider value={cache}>
                    <App />
                  </CacheProvider>
                );
              },
            })
          );

          return result;
        };

        // Grab a copy of the previos template method.
        const template = libraries.frontity.template;

        // Define the emotion style tag with the render result.
        libraries.frontity.template = ({ result, ...rest }) => {
          const { html, ids, css } = result;

          // Push the emotion style tag.
          rest.head.push(
            `<style data-emotion="${CACHE_KEY} ${ids.join(" ")}">${css}</style>`
          );

          return template({
            ...rest,
            html,
          });
        };
      },
    },
  },
} as AMP;
