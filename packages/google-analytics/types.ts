import { Action } from "frontity/types";
import Analytics, { Pageview, Event } from "@frontity/analytics/types";

declare global {
  interface Window {
    ga: Function;
  }
}

interface GoogleAnalytics extends Analytics {
  state: Analytics["state"] & {
    googleAnalytics: {
      trackingId?: string;
      trackingIds?: string[];
    };
  };
  actions: Analytics["actions"] & {
    googleAnalytics: {
      sendPageview: Action<GoogleAnalytics, Pageview>;
      sendEvent: Action<GoogleAnalytics, Event>;
    };
  };
}

export default GoogleAnalytics;
