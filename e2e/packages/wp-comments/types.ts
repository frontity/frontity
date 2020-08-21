/* eslint-disable */
import { Package } from "frontity/types";

interface WPComments extends Package {
  name: "e2e-wp-comments";
  state: {};
  actions: {};
  roots: {
    testing: React.ReactType;
  };
  libraries: {};
}

export default WPComments;
