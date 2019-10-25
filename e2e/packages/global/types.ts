import { Package } from "frontity/types";

interface Global extends Package {
  name: "global";
  state: {};
  actions: {};
  roots: {
    global: React.ReactType;
  };
  libraries: {};
}

export default Global;
