import { Package, Action } from "frontity/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

export type Pageview = {
  page: string;
  title: string;
};

export type Event = {
  name: string;
  payload: Record<string, any>;
};

interface Analytics<Pkgs = null> extends Package {
  roots: {
    analytics: React.FC;
  };
  actions: {
    analytics: {
      sendPageview: Action<Pkgs, Pageview>;
      sendEvent: Action<Pkgs, Event>;
    };
    [key: string]: {
      sendPageview?: Action<Pkgs, Pageview>;
      sendEvent?: Action<Pkgs, Event>;
    };
  };
  state: {
    analytics: {
      pageviews: Record<string, boolean>;
      events: Record<string, boolean>;
    };
  };
}

export type Packages = Analytics<Packages> &
  Router<Packages> &
  Source<Packages>;

export default Analytics;
