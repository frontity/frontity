/* eslint-disable */
import { Package } from "frontity/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";
import SmartAdserver from "@frontity/smart-adserver/types";
import WpSource from "../../../packages/wp-source/types";

interface TestSmartAdserver extends Package {
  name: "e2e-smart-adserver";
  state: {
    source?: WpSource["state"]["source"];
  };
  roots: {
    smartAdserver: React.ElementType;
  };
}

export type Packages = Router & Source & TestSmartAdserver & SmartAdserver;

export default TestSmartAdserver;
