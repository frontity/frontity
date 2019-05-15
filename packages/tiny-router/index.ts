import Router from "@frontity/router";
import { Action } from "frontity/types";

interface TinyRouter extends Router {
  name: "@frontity/tiny-router";
  actions: Router["actions"] & {
    router: {
      init: Action<TinyRouter>;
    };
  };
}

export default TinyRouter;
