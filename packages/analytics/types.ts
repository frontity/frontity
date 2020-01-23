import { Package, Action } from "frontity/types";
import Source from "@frontity/source";

export type Pageview = {
  page: string;
  title: string;
};

export type Event = {
  category: string;
  action: string;
  label?: string;
};

interface Analytics extends Package {
  actions: {
    analytics: {
      sendPageview: Action<Analytics, Pageview>;
      sendEvent: Action<Analytics, Event>;
    };
    [key: string]: {
      sendPageview: Action<Analytics, Pageview>;
      sendEvent: Action<Analytics, Event>;
    };
  };
  state: {
    analytics: {
      namespaces: Record<string, string>;
    };
    router?: {
      link: string;
    };
    source?: {
      get: Source["state"]["source"]["get"];
    };
  };
}

export default Analytics;
