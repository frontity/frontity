import {
  sendPageview,
  sendEvent,
  Root as AnalyticsRoot
} from "@frontity/analytics";
import GoogleAnalytics from "../types";
import Root from "./components";

export const getTrackerName = (id: string) =>
  `tracker_${id.replace(/-/g, "_")}`;

const googleAnalytics: GoogleAnalytics = {
  roots: {
    analytics: AnalyticsRoot,
    googleAnalytics: Root
  },
  actions: {
    analytics: {
      sendPageview,
      sendEvent
    },
    googleAnalytics: {
      sendPageview: ({ state }) => pageview => {
        // Get Tracking ids from state.
        const { trackingIds, trackingId } = state.googleAnalytics;
        const ids = trackingIds || (trackingId && [trackingId]) || [];

        // Send the pageview to the trackers.
        ids.forEach(id =>
          window.ga(`${getTrackerName(id)}.send`, {
            hitType: "pageview",
            ...pageview
          })
        );
      },
      sendEvent: ({ state }) => event => {
        // Get Tracking ids from state.
        const { trackingIds, trackingId } = state.googleAnalytics;
        const ids = trackingIds || (trackingId && [trackingId]) || [];

        ids
          .map(id => getTrackerName(id))
          .forEach(name => {
            window.ga(`${name}.send`, {
              hitType: "event",
              eventCategory: event.category,
              eventAction: event.action,
              eventLabel: event.label
            });
          });
      }
    }
  },
  state: {
    analytics: {
      namespaces: ["googleAnalytics"]
    },
    googleAnalytics: {}
  }
};

export default googleAnalytics;
