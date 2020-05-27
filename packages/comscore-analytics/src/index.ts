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
      sendPageview: ({ state }) => () => {
        const trackingIds = state.comscoreAnalytics.trackingIds;
        const hasTrackingIds = trackingIds.length > 0;

        if (hasTrackingIds) {
          if (window.COMSCORE) {
            trackingIds.forEach((id) =>
              window.COMSCORE.beacon({ c1: "2", c2: id })
            );
          } else {
            window._comscore = window._comscore || [];
            trackingIds.forEach((id) =>
              window._comscore.push({ c1: "2", c2: id })
            );
          }
        }
      },
    },
  },
  state: {
    analytics: {
      ...analytics.state.analytics,
      namespaces: ["comscoreAnalytics"],
    },
    comscoreAnalytics: {
      trackingIds: [],
    },
  },
};

export default comscoreAnalytics;
