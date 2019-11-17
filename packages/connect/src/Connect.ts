/* eslint-disable @typescript-eslint/no-unused-vars */
import { StoreType } from "../types";

interface Options {
  mode: "development" | "production";
}

interface Context {
  owner: {
    type: "debug" | "action" | "component" | "when";
    name: string;
  };
}

class Store {
  constructor(rawStore: StoreType, options?: Options) {
    // Todo...
  }

  createObservableState(context?: Context) {
    // Todo...
  }

  createMutableState(context?: Context) {
    // Todo...
  }

  createObservableActions(context?: Context) {
    // Todo...
  }

  createExecutableActions(context?: Context) {
    // Todo...
  }
}

const store = new Store({
  state: {},
  actions: {}
});

store.createObservableState();
store.createMutableState();
store.createObservableActions();
store.createExecutableActions();

export default Connect;
