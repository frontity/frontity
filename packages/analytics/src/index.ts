import Root from "./components";
import Analytics from "../types";

/**
 * Main analytics package. It contains the logic of how and when to send
 * pageviews.
 *
 * This package is not meant to be used directly, but imported by other
 * analytics packages, like `@frontity/google-analytics`.
 *
 * @namespace analytics
 */
const analytics: Analytics = {
  roots: {
    analytics: Root,
  },
  state: {
    analytics: {
      namespaces: [],
    },
  },
  actions: {
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
