import { warn } from "frontity";
import analytics from "@frontity/analytics";
import ComscoreAnalytics from "../types";
import Root from "./components";

const comscoreAnalytics: ComscoreAnalytics = {
  roots: {
    ...analytics.roots,
    comscoreAnalytics: Root,
  },
  actions: {
    ...analytics.actions,
    comscoreAnalytics: {
      pageview: ({ state }) => () => {
        // Get Tracking ids from state.
        const { trackingIds, trackingId } = state.comscoreAnalytics;
        const ids = trackingIds || (trackingId && [trackingId]) || [];

        if (ids.length === 0)
          warn(
            "Trying to send an event to Comscore but neither `trackingId` nor `trackingIds` are specified inside `state.comscoreAnalytics`."
          );

        ids.forEach((id) => {
          if (window.COMSCORE) window.COMSCORE.beacon({ c1: "2", c2: id });
          else {
            window._comscore = window._comscore || [];
            window._comscore.push({ c1: "2", c2: id });
          }
        });
      },
    },
  },
  state: {
    analytics: {
      ...analytics.state.analytics,
      pageviews: {
        comscoreAnalytics: true,
      },
    },
    comscoreAnalytics: {},
  },
};

export default comscoreAnalytics;
