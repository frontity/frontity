import { Package, Action } from "frontity/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

export type Pageview = {
  link: string;
  title: string;
};

export type Event = {
  name: string;
  payload: Record<string, any>;
};

interface Analytics extends Package {
  roots: {
    analytics: React.FC;
  };
  actions: {
    analytics: {
      pageview: Action<Analytics, Pageview>;
      event: Action<Analytics, Event>;
    };
  };
  state: {
    analytics: {
      pageviews: Record<string, boolean>;
      events: Record<string, boolean>;
    };
  };
}

export type Packages = Analytics & Router & Source;

export default Analytics;
