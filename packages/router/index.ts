import { Package, Action, Derived } from "@frontity/types";

export type PathOrObj = string | { path: string; page: number };

interface Router extends Package {
  state: {
    frontity?: Package["state"]["frontity"];
    router: {
      path: string;
      page: number;
      location: Derived<Router, URL>;
    };
  };
  actions: {
    router: {
      set: Action<Router, PathOrObj>;
    };
  };
}

export default Router;
