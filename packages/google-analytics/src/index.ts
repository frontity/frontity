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
      pageview: ({ state }) => (pageview) => {
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
      event: ({ state }) => ({ name, payload }) => {
        // Get Tracking ids from state.
        const { trackingIds, trackingId } = state.googleAnalytics;
        const ids = trackingIds || (trackingId && [trackingId]) || [];

        ids
          .map((id) => getTrackerName(id))
          .forEach((trackerName) => {
            window.ga(`${trackerName}.send`, {
              hitType: "event",
              eventAction: name,
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
      pageviews: { googleAnalytics: true },
      events: { googleAnalytics: true },
    },
    googleAnalytics: {},
  },
};

export default googleAnalytics;
