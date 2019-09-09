import { Package } from "frontity/types";

interface Head extends Package {
  name: "head";
  state: {};
  actions: {};
  roots: {
    head: React.ReactType;
  };
  libraries: {};
}

export default Head;
