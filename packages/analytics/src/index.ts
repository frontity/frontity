import Root from "./components";
import Analytics, { Packages } from "../types";

const analytics: Analytics<Packages> = {
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
    /**
     * Get the functions for every analytics package
     * and run `sendPageview` for each one.
     */
    analytics: {
      sendPageview: ({ state, actions }) => (pageview) => {
        Object.entries(state.analytics.pageviews).forEach(
          ([namespace, shouldSend]) => {
            if (shouldSend) actions[namespace].sendPageview(pageview);
          }
        );
      },

      /**
       * Get the functions for every analytics package
       * and run `sendEvent` for each one.
       */
      sendEvent: ({ state, actions }) => (event) => {
        Object.entries(state.analytics.events).forEach(
          ([namespace, shouldSend]) => {
            if (shouldSend) actions[namespace].sendEvent(event);
          }
        );
      },
    },
  },
};

export default analytics;
