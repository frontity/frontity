import analytics from "@frontity/analytics";
import GoogleTagManagerAnalytics from "../types";
import Root from "./components";

const googleTagManagerAnalytics: GoogleTagManagerAnalytics = {
  name: "@frontity/google-tag-manager",
  roots: {
    ...analytics.roots,
    googleTagManagerAnalytics: Root,
  },
  actions: {
    ...analytics.actions,
    googleTagManagerAnalytics: {
      pageview: () => (pageview) => {
        // Send the pageview to the trackers.
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "pageview", ...pageview });
      },
      event: () => ({ name: event, payload }) => {
        // Send the event to the trackers.
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event, payload });
      },
    },
  },
  state: {
    analytics: {
      ...analytics.state.analytics,
      pageviews: { googleTagManagerAnalytics: true },
      events: { googleTagManagerAnalytics: true },
    },
    googleTagManagerAnalytics: {},
  },
};

export default googleTagManagerAnalytics;
