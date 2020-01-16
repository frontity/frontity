import { sendPageview, sendEvent, afterCSR } from "@frontity/analytics";
import GoogleAnalytics from "../types";

const googleAnalytics: GoogleAnalytics = {
  actions: {
    analytics: {
      sendPageview,
      sendEvent,
      afterCSR
    },
    ga: {
      sendPageview: ({ state }) => pageview => {
        // Do something with that pageview.
        console.log(state.ga.trackingId, pageview);
      },
      sendEvent: ({ state }) => event => {
        // Do something with that event.
        console.log(state.ga.trackingId, event);
      }
    }
  },
  state: {
    analytics: {
      namespaces: ["ga"]
    },
    ga: {
      trackingId: ""
    }
  }
};

export default googleAnalytics;
