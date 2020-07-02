import { warn } from "frontity";
import analytics from "@frontity/analytics";
import GoogleAnalytics from "../types";
import Root from "./components";

/**
 * Generates a name for the tracking ID passed as argument.
 *
 * This function is used by the Google Analytics root component and actions to
 * initialize and send pageviews and events to each tracking ID separately.
 *
 * @example
 * ```
 * getTrackerName("UA-01234567-89") // => "tracker_UA_01234567_89".
 * ```
 *
 * @param id - Tracking ID.
 *
 * @returns A name for the given tracking ID.
 */
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
