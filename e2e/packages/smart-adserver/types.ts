/* eslint-disable */
import { Package } from "frontity/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";
import SmartAdserver from "@frontity/smart-adserver/types";
import WpSource from "../../../packages/wp-source/types";

interface TestSmartAdserver extends Package {
  name: "e2e-smart-adserver";
  state: {
    source?: {
      data: WpSource["state"]["source"]["data"];
      get: Source["state"]["source"]["get"];
    };
    router: {
      link: Router["state"]["router"]["link"];
    };
  };
  roots: {
    theme: React.ElementType;
  };
}

export type Packages = TestSmartAdserver & Router & Source & SmartAdserver;

export default TestSmartAdserver;
