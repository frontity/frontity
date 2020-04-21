import analytics from "@frontity/analytics";
import GoogleAnalytics from "../types";
import Root from "./components";

export const getTrackerName = (id: string) =>
  `tracker_${id.replace(/-/g, "_")}`;

const googleAnalytics: GoogleAnalytics = {
  roots: {
    ...analytics.roots,
    googleAnalytics: Root,
  },
  actions: {
    ...analytics.actions,
    googleAnalytics: {
      sendPageview: ({ state }) => (pageview) => {
        // Get Tracking ids from state.
        const { trackingIds, trackingId } = state.googleAnalytics;
        const ids = trackingIds || (trackingId && [trackingId]) || [];

        // Send the pageview to the trackers.
        ids.forEach((id) =>
          window.ga(`${getTrackerName(id)}.send`, {
            hitType: "pageview",
            ...pageview,
          })
        );
      },
      sendEvent: ({ state }) => ({ event, payload }) => {
        // Get Tracking ids from state.
        const { trackingIds, trackingId } = state.googleAnalytics;
        const ids = trackingIds || (trackingId && [trackingId]) || [];

        ids
          .map((id) => getTrackerName(id))
          .forEach((name) => {
            window.ga(`${name}.send`, {
              hitType: "event",
              eventAction: event,
              eventCategory: payload.category,
              eventLabel: payload.label,
              eventValue: payload.value,
              transport: payload.transport,
              nonInteraction: payload.nonInteraction,
            });
          });
      },
    },
  },
  state: {
    analytics: {
      ...analytics.state.analytics,
      namespaces: ["googleAnalytics"],
    },
    googleAnalytics: {},
  },
};

export default googleAnalytics;
