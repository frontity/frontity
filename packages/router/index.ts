import { Package, Action, Derived } from "@frontity/types";

export type PathOrObj = string | { path: string; page: number };

interface Router extends Package {
  state: {
    router: {
      path: string;
      page: null | number;
    };
  };
  actions: {
    router: {
      set: Action<Router, PathOrObj>;
    };
  };
}

export default Router;
