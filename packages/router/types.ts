import { Package, Action } from "frontity/types";

interface Router<T = null> extends Package {
  state: {
    frontity?: Package["state"]["frontity"];
    router: {
      link: string;
      previous?: string;
      state: SetOptions["state"];
    };
  };
  actions: {
    router: {
      set:
        | Action<T extends null ? Router : T, string>
        | Action<T extends null ? Router : T, string, SetOptions>;
    };
  };
}

export default Router;

export interface SetOptions {
  method?: "push" | "replace";
  state?: any;
}
