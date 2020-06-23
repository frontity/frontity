import { warn } from "frontity";
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
      pageview: ({ state }) => ({ link, title }) => {
        // Get Tracking ids from state.
        const { trackingIds, trackingId } = state.googleAnalytics;
        const ids = trackingIds || (trackingId && [trackingId]) || [];

        if (ids.length === 0)
          warn(
            "Trying to send a pageview to Google Analytics but neither `trackingId` nor `trackingIds` are specified inside `state.googleAnalytics`."
          );

        // Send the pageview to the trackers.
        ids.forEach((id) =>
          window.ga(`${getTrackerName(id)}.send`, {
            hitType: "pageview",
            page: link,
            title,
          })
        );
      },
      event: ({ state }) => ({ name, payload }) => {
        // Get Tracking ids from state.
        const { trackingIds, trackingId } = state.googleAnalytics;
        const ids = trackingIds || (trackingId && [trackingId]) || [];

        if (ids.length === 0)
          warn(
            "Trying to send an event to Google Analytics but neither `trackingId` nor `trackingIds` are specified inside `state.googleAnalytics`."
          );

        ids
          .map((id) => getTrackerName(id))
          .forEach((trackerName) => {
            const { category, label, value, ...rest } = payload;
            window.ga(`${trackerName}.send`, {
              hitType: "event",
              eventAction: name,
              eventCategory: category,
              eventLabel: label,
              eventValue: value,
              ...rest,
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
