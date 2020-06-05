import { Package } from "frontity/types";
import Analytics, { Pageview } from "@frontity/analytics/types";
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
      namespaces: Analytics["state"]["analytics"]["namespaces"];
    };
    testAnalytics: {
      pageviews: Pageview[];
    };
  };
  actions: {
    source: {
      fetch: Source<Pkgs>["actions"]["source"]["fetch"];
    };
    testAnalytics: {
      sendPageview: Analytics<Pkgs>["actions"]["analytics"]["sendPageview"];
    };
  };
  roots: {
    theme: React.ReactType;
  };
}

export type Packages = TestAnalytics<Packages> &
  Router<Packages> &
  Source<Packages> &
  Analytics;

export default TestAnalytics;
