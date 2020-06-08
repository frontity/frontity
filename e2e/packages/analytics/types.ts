import { Package } from "frontity/types";
import Analytics from "@frontity/analytics/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

interface TestAnalytics extends Package {
  name: "e2e-analytics";
  state?: {
    router?: Router["state"]["router"];
    source?: Partial<Source["state"]["source"]>;
  };
  actions?: {
    analytics?: Analytics["actions"]["analytics"];
    router?: Router["actions"]["router"];
    source?: {
      fetch: Source["actions"]["source"]["fetch"];
    };
  };
  roots: {
    theme: React.ReactType;
  };
}

export default TestAnalytics;
