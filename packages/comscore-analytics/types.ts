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

interface ComscoreAnalytics<Pkgs extends Package> extends Package {
  roots: {
    comscoreAnalytics: ReactType;
  };
  state: {
    comscoreAnalytics: {
      trackingIds: string[];
    };
    analytics: {
      pageviews: {
        comscoreAnalytics: boolean;
      };
    };
  };
  actions: {
    comscoreAnalytics: {
      pageview: Action<Pkgs, Pageview>;
    };
  };
}
export type Packages = ComscoreAnalytics<Packages> & Analytics<Packages>;

export default ComscoreAnalytics;
