import { sendPageview, sendEvent, afterCSR } from "@frontity/analytics";
import GoogleAnalytics from "../types";
import Root from "./components";

export const getTrackerName = (id: string) =>
  `tracker_${id.replace(/-/g, "_")}`;

const googleAnalytics: GoogleAnalytics = {
  roots: { ga: Root },
  actions: {
    analytics: {
      sendPageview,
      sendEvent,
      afterCSR
    },
    ga: {
      sendPageview: ({ state }) => pageview => {
        // Get Tracking ids from state.
        const { trackingIds, trackingId } = state.ga;
        const ids = trackingIds || (trackingId && [trackingId]) || [];

        // Do something with that pageview.
        console.log(ids, pageview);

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
        const { trackingIds, trackingId } = state.ga;
        const ids = trackingIds || (trackingId && [trackingId]) || [];

        // Do something with that event.
        console.log(ids, event);

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
      namespaces: ["ga"]
    },
    ga: {}
  }
};

export default googleAnalytics;
