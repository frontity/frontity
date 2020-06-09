import { ReactType } from "react";
import { Action } from "frontity/types";
import Analytics, { Pageview, Event } from "@frontity/analytics/types";

declare global {
  interface Window {
    dataLayer: {
      push: (payload: any) => number;
    };
  }
}

interface GoogleTagManager extends Analytics {
  roots: Analytics["roots"] & {
    googleTagManager: ReactType;
  };
  state: Analytics["state"] & {
    googleTagManager: {
      containerId?: string;
      containerIds?: string[];
    };
  };
  actions: Analytics["actions"] & {
    googleTagManager: {
      pageview: Action<GoogleTagManager, Pageview>;
      event: Action<GoogleTagManager, Event>;
    };
  };
}

export default GoogleTagManager;
