import { Package, Action } from "frontity/types";
import Analytics, { Pageview, Event } from "@frontity/analytics/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

interface TestAnalytics extends Package {
  name: "e2e-analytics";
  state: {
    source: {
      data: Source["state"]["source"]["data"];
      get: Source["state"]["source"]["get"];
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
      fetch: Source["actions"]["source"]["fetch"];
    };
    testAnalytics: {
      sendPageview: Action<Packages, Pageview>;
      sendEvent: Action<Packages, Event>;
    };
  };
  roots: {
    theme: React.ReactType;
  };
}

export type Packages = TestAnalytics & Router & Source & Analytics;

export default TestAnalytics;
