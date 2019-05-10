import { Package, Derived, Action } from "@frontity/types";

export type PathOrObj = string | { path: string; page: number };

interface Router extends Package {
  name: "@frontity/tiny-router";
  state: {
    router: {
      path: string;
      page: null | number;
      url: Derived<Router, string>;
    };
  };
  actions: {
    router: {
      init?: Action<Router>;
      set: Action<Router, PathOrObj>;
    };
  };
}

export default Router;