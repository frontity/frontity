import { warn } from "frontity";
import analytics from "@frontity/analytics";
import ComscoreAnalytics, { Packages } from "../types";
import Root from "./components";

const comscoreAnalytics: ComscoreAnalytics<Packages> = {
  roots: {
    ...analytics.roots,
    comscoreAnalytics: Root,
  },
  actions: {
    ...analytics.actions,
    comscoreAnalytics: {
      pageview: ({ state }) => () => {
        const { trackingIds } = state.comscoreAnalytics;

        if (trackingIds.length === 0)
          warn(
            "Trying to send pageviews to Comscore but `state.comscoreAnalytics.trackingIds` is empty."
          );

        trackingIds.forEach((id) => {
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
    comscoreAnalytics: {
      trackingIds: [],
    },
  },
};

export default comscoreAnalytics;
