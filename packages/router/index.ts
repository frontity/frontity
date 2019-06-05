import { Package, Action } from "frontity/types";

interface Router<T = null> extends Package {
  state: {
    frontity?: Package["state"]["frontity"];
    router: {
      link: string;
    };
  };
  actions: {
    router: {
      set: Action<T extends null ? Router : T, string>;
    };
  };
}

export default Router;
