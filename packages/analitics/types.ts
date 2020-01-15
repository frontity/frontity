import { Package, Action } from "frontity/types";

export type Pageview = {
  url: string;
  title: string;
};

export type Event = {
  type: string;
  content: string;
};

export interface Analytics extends Package {
  actions: {
    analytics: {
      afterCSR: Action<Analytics>;
      sendPageview: Action<Analytics, Pageview>;
      sendEvent: Action<Analytics, Event>;
    };
  };
  libraries: {
    analytics: Record<
      string,
      {
        sendPageview: (p: Pageview) => void;
        sendEvent: (e: Event) => void;
      }
    >;
  };
}
