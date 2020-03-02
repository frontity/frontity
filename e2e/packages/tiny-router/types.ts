import { Package } from "frontity/types";
import Router from "@frontity/tiny-router/types";

interface TinyRouter extends Package {
  name: "tiny-router";
  state: {
    router: Router["state"]["router"];
  };
  actions: {
    router: Router["actions"]["router"] & {
      set: Router["actions"]["router"]["set"];
    };
  };
  roots: {
    theme: React.ReactType;
  };
  libraries: {};
}

export default TinyRouter;
