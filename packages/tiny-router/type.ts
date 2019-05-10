import { Package, Derived, Action } from "@frontity/types";

export type PathOrObj = string | { path: string; page: number };

interface TinyRouter extends Package {
  name: "@frontity/tiny-router";
  state: {
    frontity?: {
      url: string;
    };
    router: {
      path: string;
      page: null | number;
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
