import analytics from "@frontity/analytics";
import GoogleTagManager from "../types";
import Root from "./components";

const googleTagManager: GoogleTagManager = {
  name: "@frontity/google-tag-manager",
  roots: {
    ...analytics.roots,
    googleTagManager: Root,
  },
  actions: {
    ...analytics.actions,
    googleTagManager: {
      sendPageview: () => (pageview) => {
        // Send the pageview to the trackers.
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "virtualPageview", pageview });
      },
      sendEvent: () => (virtualEvent) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "virtualEvent", virtualEvent });
      },
    },
  },
  state: {
    analytics: {
      ...analytics.state.analytics,
      namespaces: ["googleTagManager"],
    },
    googleTagManager: {},
  },
};

export default googleTagManager;
