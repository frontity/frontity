import { ReactType } from "react";
import { Action } from "frontity/types";
import Analytics, { Pageview } from "@frontity/analytics/types";

declare global {
  interface Window {
    ga: Function;
  }
}

interface GoogleAnalyticsEvent {
  name: string;
  payload: {
    category: string;
    label: string;
    value: number;
    // More info in https://developers.google.com/analytics/devguides/collection/analyticsjs/events#measure_outbound_links_and_forms.
    transport: string;
    // More info in https://developers.google.com/analytics/devguides/collection/analyticsjs/events#non-interaction_events.
    nonInteraction: boolean;
  };
}

interface GoogleAnalytics extends Analytics {
  roots: Analytics["roots"] & {
    googleAnalytics: ReactType;
  };
  state: Analytics["state"] & {
    googleAnalytics: {
      trackingId?: string;
      trackingIds?: string[];
    };
  };
  actions: Analytics["actions"] & {
    googleAnalytics: {
      sendPageview: Action<GoogleAnalytics, Pageview>;
      sendEvent: Action<GoogleAnalytics, GoogleAnalyticsEvent>;
    };
  };
}

export default GoogleAnalytics;
