import Root from "./components";
import Analytics from "../types";

const analytics: Analytics = {
  roots: {
    analytics: Root,
  },
  state: {
    analytics: {
      pageviews: {},
      events: {},
    },
  },
  actions: {
    analytics: {
      /**
       * Get the functions for every analytics package
       * and run `pageview` for each one.
       */
      pageview: ({ state, actions }) => (pageview) => {
        Object.entries(state.analytics.pageviews).forEach(
          ([namespace, shouldSend]) => {
            if (shouldSend) actions[namespace].pageview(pageview);
          }
        );
      },

      /**
       * Get the functions for every analytics package
       * and run `event` for each one.
       */
      event: ({ state, actions }) => (event) => {
        Object.entries(state.analytics.events).forEach(
          ([namespace, shouldSend]) => {
            if (shouldSend) actions[namespace].event(event);
          }
        );
      },
    },
  },
};

export default analytics;
