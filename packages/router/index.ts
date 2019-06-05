import { Package, Action } from "frontity/types";

export type RouteOrParams =
  | string
  | {
      path: string;
      page?: number;
      query?: Record<string, any>;
    };

interface Router<T = null> extends Package {
  state: {
    frontity?: Package["state"]["frontity"];
    router: {
      path: string;
      page: number;
      query: Record<string, any>;
    };
  };
  actions: {
    router: {
      set: Action<T extends null ? Router : T, RouteOrParams>;
    };
  };
}

export default Router;
