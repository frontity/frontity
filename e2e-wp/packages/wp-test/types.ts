import { Package } from "frontity/types";

interface WPTest extends Package {
  name: "e2e-wp-test";
  state: {};
  actions: {};
  roots: {
    testing: React.ReactType;
  };
  libraries: {};
}

export default WPTest;
