/* eslint-disable */
import { Package } from "frontity/types";
import WPCommentsPackage from "@frontity/wp-comments/types";

interface WPComments extends Package {
  name: "e2e-wp-comments";
  state: {
    comments: WPCommentsPackage["state"]["comments"];
  };
  actions?: {
    comments: {
      submit: WPCommentsPackage["actions"]["comments"]["submit"];
      updateFields: WPCommentsPackage["actions"]["comments"]["updateFields"];
    };
  };
  roots: {
    wpComments: React.ReactType;
  };
  libraries: {};
}

export default WPComments;
