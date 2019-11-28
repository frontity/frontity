import { Package } from "frontity/types";

interface Loadable extends Package {
  name: "loadable";
  state: {};
  actions: {};
  roots: {
    loadable: React.ReactType;
  };
  libraries: {};
}

export default Loadable;
