import { Package, Action } from "frontity/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

export type Pageview = {
  page: string;
  title: string;
};

export type Event = {
  event: string;
  payload: Record<string, any>;
};

interface Analytics<Pkgs = Packages> extends Package {
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
      namespaces: string[];
    };
  };
}

export type Packages = Analytics & Router & Source;

export default Analytics;
