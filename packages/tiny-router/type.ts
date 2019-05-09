import { Package, Derived, Action, Namespaces } from "@frontity/types";
import { ResolveState } from "@frontity/types/utils";

export type PathOrObj = string | { path: string; page: number };

export type State = ResolveState<TinyRouter["state"]>;

interface TinyRouter extends Package {
  name: "@frontity/wp-source";
  namespaces: Namespaces<"router" | "frontity">
  state: {
    router: {
      path: string;
      page: null | number;
      url: Derived<TinyRouter, string>;
    };
    frontity: {
      url: string;
    };
  };
  actions: {
    router: {
      set: Action<TinyRouter, PathOrObj>;
    };
  };
}

export default TinyRouter;
