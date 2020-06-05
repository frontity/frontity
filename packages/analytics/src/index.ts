import Root from "./components";
import Analytics, { Packages } from "../types";

const analytics: Analytics<Packages> = {
  roots: {
    analytics: Root,
  },
  state: {
    analytics: {
      namespaces: [],
    },
  },
  actions: {
    /**
     * Get the functions for every analytics package
     * and run `sendPageview` for each one.
     */
    analytics: {
      sendPageview: ({ state, actions }) => (pageview) => {
        state.analytics.namespaces
          .map((ns) => actions[ns])
          .forEach(({ sendPageview }) => sendPageview(pageview));
      },

      /**
       * Get the functions for every analytics package
       * and run `sendEvent` for each one.
       */
      sendEvent: ({ state, actions }) => (event) => {
        state.analytics.namespaces
          .map((ns) => actions[ns])
          .forEach(({ sendEvent }) => sendEvent && sendEvent(event));
      },
    },
  },
};

export default analytics;
