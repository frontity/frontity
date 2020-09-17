/* eslint-disable */
import { Package } from "frontity/types";
import SmartAdserverPackage from "@frontity/smart-adserver/types";
import WpSource from "../../../packages/wp-source/types";

interface SmartAdserver extends Package {
  name: "e2e-wp-comments";
  state: {
    source?: WpSource["state"]["source"];
    fills: {};
  };
  roots: {
    smartAdserver: React.ReactType;
  };
  libraries: {};
}

export default SmartAdserver;
