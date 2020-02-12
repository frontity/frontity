import Router from "@frontity/router";
import Source from "@frontity/source/types";
import { Action } from "frontity/types";

interface TinyRouter extends Router {
  name: "@frontity/tiny-router";
  state: Router<TinyRouter>["state"] & {
    router: {
      autoFetch?: boolean;
    };
  };
  actions: Router<TinyRouter>["actions"] & {
    router: {
      init: Action<TinyRouter>;
      beforeSSR?: Action<TinyRouter>;
    };
    source?: {
      fetch?: Source["actions"]["source"]["fetch"];
    };
  };
  libraries: {
    source?: {
      normalize?: Source["libraries"]["source"]["normalize"];
    };
  };
}

export default TinyRouter;
