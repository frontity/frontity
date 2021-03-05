import { warn } from "frontity";
import analytics from "@frontity/analytics";
import GoogleAnalytics from "../types";
import Root from "./components";

const googleAnalytics: GoogleAnalytics = {
  name: "@frontity/google-analytics",
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
        ids.forEach((id: string) =>
          window.gtag("event", "page_view", {
            send_to: id,
            page_title: title,
            page_location: link,
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

        ids.forEach((id: any) => {
          const { category, label, value, ...rest } = payload;

          window.gtag("event", name, {
            send_to: id,
            event_category: category,
            event_label: label,
            value,
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
