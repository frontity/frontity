import { Package } from "frontity/types";
import Router from "@frontity/tiny-router/types";

interface TinyRouter extends Package {
  name: "tiny-router";
  state: {
    router?: Router["state"]["router"];
  };
  actions: {
    router?: Router["actions"]["router"];
  };
  roots: {
    tinyRouter: React.ReactType;
  };
  libraries: {};
}

export default TinyRouter;
