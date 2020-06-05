import { Package, Action } from "frontity/types";
import Analytics, { Pageview, Event } from "@frontity/analytics/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

interface TestAnalytics<Pkgs = null> extends Package {
  name: "e2e-analytics";
  state: {
    source: {
      data: Source<Pkgs>["state"]["source"]["data"];
      get: Source<Pkgs>["state"]["source"]["get"];
    };
    analytics: {
      pageviews: {
        testAnalytics: boolean;
      };
      events: {
        testAnalytics: boolean;
      };
    };
    testAnalytics: {
      pageviews: Pageview[];
      events: Event[];
    };
  };
  actions: {
    source: {
      fetch: Source<Pkgs>["actions"]["source"]["fetch"];
    };
    testAnalytics: {
      pageview: Action<Pkgs, Pageview>;
      event: Action<Pkgs, Event>;
    };
  };
  roots: {
    theme: React.ReactType;
  };
}

export type Packages = TestAnalytics<Packages> &
  Router<Packages> &
  Source<Packages> &
  Analytics<Packages>;

export default TestAnalytics;
