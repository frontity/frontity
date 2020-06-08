import Router from "@frontity/router/types";
import Source from "@frontity/source/types";
import { Action, ServerAction } from "frontity/types";

interface TinyRouter extends Router {
  name: "@frontity/tiny-router";
  state: Router<TinyRouter>["state"] & {
    frontity?: Router["state"]["frontity"];
    router: {
      autoFetch?: boolean;
    };
    source?: {
      get?: Source["state"]["source"]["get"];
    };
  };
  actions: Router<TinyRouter>["actions"] & {
    router: {
      init: Action<TinyRouter>;
      beforeSSR: ServerAction<TinyRouter>;
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
