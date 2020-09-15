/* eslint-disable */
import { Package } from "frontity/types";
import WPCommentsPackage from "@frontity/wp-comments/types";
import WpSource from "../../../packages/wp-source/types";

interface WPComments extends Package {
  name: "e2e-wp-comments";
  state: {
    comments: WPCommentsPackage["state"]["comments"];
    source?: WpSource["state"]["source"] & WPCommentsPackage["state"]["source"];
  };
  actions?: {
    comments: {
      submit: WPCommentsPackage["actions"]["comments"]["submit"];
      updateFields: WPCommentsPackage["actions"]["comments"]["updateFields"];
    };
    source: {
      fetch: WpSource["actions"]["source"]["fetch"];
    };
  };
  roots: {
    wpComments: React.ReactType;
  };
  libraries: {};
}

export default WPComments;
