import { Package, Action } from "frontity/types";

interface HistoryEntry {
  url: string;
  title: string;
  state: object;
}

type History = HistoryEntry & {
  entries: HistoryEntry[];
};

interface Router<T = null> extends Package {
  state: {
    frontity?: Package["state"]["frontity"];
    router: {
      link: string;
      history: History[];
    };
  };
  actions: {
    router: {
      set: Action<T extends null ? Router : T, string>;
    };
  };
}

export default Router;
