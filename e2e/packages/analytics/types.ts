import { Package } from "frontity/types";
import Analytics from "@frontity/analytics/types";

interface TestPackage extends Package {
  name: "analytics";
  state: {
    analytics: Analytics["state"]["analytics"];
  };
  actions: {
    analytics: Analytics["actions"]["analytics"];
  };
  roots: {
    analytics: Analytics["roots"]["analytics"];
    theme: React.ReactType;
  };
}

export default TestPackage;
