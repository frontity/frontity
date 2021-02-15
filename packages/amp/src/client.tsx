import { CacheProvider } from "frontity";
import createCache from "@emotion/cache";
import config, { CACHE_KEY } from "./config";

export default {
  ...config,
  actions: {
    amp: {
      ...config.actions.amp,
      beforeCSR({ libraries }) {
        // Grab a copy of the previous render method.
        const PreviousApp = libraries.frontity.App;
        const cache = createCache({ key: CACHE_KEY });

        // Define the emotion css extraction one.
        libraries.frontity.App = function Wrapped() {
          return (
            <CacheProvider value={cache}>
              <PreviousApp />
            </CacheProvider>
          );
        };
      },
    },
  },
};
