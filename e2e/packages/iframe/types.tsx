import { Package } from "frontity/types";

interface Iframe extends Package {
  name: "iframe";
  state: {};
  actions: {};
  roots: {
    iframe: React.ReactType;
  };
  libraries: {};
}

export default Iframe;
