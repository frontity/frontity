import { ReactType } from "react";
import { Action } from "frontity/types";
import Analytics, { Pageview } from "@frontity/analytics/types";

declare global {
  interface Window {
    comscore: {
      beacon: Function;
    };
    _comscore: Array<{
      c1: string;
      c2: string;
    }>;
  }
}

interface ComscoreAnalytics extends Analytics {
  roots: Analytics["roots"] & {
    comscoreAnalytics: ReactType;
  };
  state: Analytics["state"] & {
    comscoreAnalytics: {
      trackingIds: string[];
      id: string;
    };
  };
  actions: Analytics["actions"] & {
    comscoreAnalytics: {
      sendPageview: Action<ComscoreAnalytics, Pageview>;
    };
  };
}

export default ComscoreAnalytics;
