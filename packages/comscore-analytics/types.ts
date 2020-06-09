import { ReactType } from "react";
import { Action, Package } from "frontity/types";
import Analytics, { Pageview } from "@frontity/analytics/types";

declare global {
  interface Window {
    COMSCORE: {
      beacon: Function;
    };
    _comscore: Array<{
      c1: string;
      c2: string;
    }>;
  }
}

interface ComscoreAnalytics extends Package {
  roots: Analytics["roots"] & {
    comscoreAnalytics: ReactType;
  };
  state: Analytics["state"] & {
    comscoreAnalytics: {
      trackingIds: string[];
    };
    analytics: {
      pageviews: {
        comscoreAnalytics: boolean;
      };
    };
  };
  actions: Analytics["actions"] & {
    comscoreAnalytics: {
      pageview: Action<ComscoreAnalytics, Pageview>;
    };
  };
}
export type Packages = ComscoreAnalytics & Analytics;

export default ComscoreAnalytics;
