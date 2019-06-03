import Router from "@frontity/router";
import Source from "@frontity/source";
import { Action } from "frontity/types";

interface TinyRouter extends Router {
  name: "@frontity/tiny-router";
  actions: Router<TinyRouter>["actions"] & {
    router: {
      init: Action<TinyRouter>;
    };
  };
  libraries: {
    source?: {
      getParams: Source["libraries"]["source"]["getParams"];
      getRoute: Source["libraries"]["source"]["getRoute"];
    };
  };
}

export default TinyRouter;
