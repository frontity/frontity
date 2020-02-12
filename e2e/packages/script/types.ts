import { Package } from "frontity/types";

interface Script extends Package {
  name: "script";
  state: {};
  actions: {};
  roots: {
    script: React.ReactType;
  };
  libraries: {};
}

export default Script;
