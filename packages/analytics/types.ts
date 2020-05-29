import { Package, Action } from "frontity/types";
import Source from "@frontity/source/types";

export type Pageview = {
  page: string;
  title: string;
};

export type Event = {
  event: string;
  payload: Record<string, any>;
};

interface Analytics extends Package {
  roots: {
    analytics: React.FC;
  };
  actions: {
    analytics: {
      sendPageview: Action<Analytics, Pageview>;
      sendEvent: Action<Analytics, Event>;
    };
    [key: string]: {
      sendPageview?: Action<Analytics, Pageview>;
      sendEvent?: Action<Analytics, Event>;
    };
  };
  state: {
    analytics: {
      namespaces: string[];
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
