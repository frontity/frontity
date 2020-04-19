import { Package } from "frontity/types";
import Analytics from "@frontity/analytics/types";
import Source from "@frontity/source/types";

interface TestPackage extends Package {
  name: "e2e-analytics";
  state?: {
    source?: {
      data: Record<string, any>;
      get: Source["state"]["source"]["get"];
    };
  };
  actions?: {
    analytics?: Analytics["actions"]["analytics"];
    source?: {
      fetch: Source["actions"]["source"]["fetch"];
    };
  };
  roots: {
    theme: React.ReactType;
  };
}

export default TestPackage;
