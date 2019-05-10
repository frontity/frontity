import Router from "@frontity/router";
import { Derived, Action } from "@frontity/types";

export type PathOrObj = string | { path: string; page: number };

interface TinyRouter extends Router {
  name: "@frontity/tiny-router";
  state: {
    frontity?: {
      url: string;
    };
    router: Router["state"]["router"] & {
      url: Derived<TinyRouter, string>;
    };
  };
  actions: {
    router: {
      init: Action<TinyRouter>;
      set: Action<TinyRouter, PathOrObj>;
    };
  };
}

export default TinyRouter;
