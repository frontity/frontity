import { Package, Action } from "frontity/types";

export type Pageview = {
  page: string;
  title: string;
};

export type Event = {
  category: string;
  action: string;
  label: string;
};

interface Analytics extends Package {
  actions: {
    analytics: {
      afterCSR: Action<Analytics>;
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
      namespaces: string[];
    };
    router?: {
      link: string;
    };
  };
}

export default Analytics;
