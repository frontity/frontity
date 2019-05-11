import { Package, Action, Derived } from "@frontity/types";

export type PathOrObj = string | { path: string; page: number };

interface Router extends Package {
  state: {
    frontity?: {
      url: string;
    };
    router: {
      path: string;
      page: null | number;
      url: Derived<Router, string>;
    };
  };
  actions: {
    router: {
      set: Action<Router, PathOrObj>;
    };
  };
}

export default Router;
