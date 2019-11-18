/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  StoreType,
  ObservableState,
  MutableState,
  ObservableActions,
  ExecutableActions,
  FilterStore
} from "../types";
import { ComponentType, FunctionComponent } from "react";

interface Options {
  mode: "development" | "production";
}

interface Context {
  owner: {
    type: "debug" | "action" | "component" | "when";
    name: string;
  };
}

interface ObservableMiddleware {
  (args: { path: string; target: object; key: string; context: Context }): void;
}

interface MutableMiddleware {
  (args: {
    path: string;
    patch: string[];
    target: object;
    key: string;
    value: unknown;
    context: Context;
  }): void;
}

interface ExecutableMiddleware {
  (args: {
    path: string;
    target: object;
    key: string;
    args: unknown[];
    abort: () => void;
    context: Context;
  }): void;
}

interface ConnectFunction<Props extends StoreType = StoreType> {
  (Component: ComponentType<Props>): FunctionComponent<FilterStore<Props>>;
}

class Store<Store extends StoreType> {
  rawStore: Store;
  connect: ConnectFunction = Component => {
    return Component as FunctionComponent<FilterStore<StoreType>>;
  };

  constructor(rawStore: Store, options?: Options) {
    this.rawStore = rawStore;
    // Todo...
  }

  replaceStore(rawStore: Store): void {
    // We should probably use deep-overwrite here to avoid breaking the references
    // of the proxies already created.
    this.rawStore = rawStore;
  }

  getConnect(): ConnectFunction {
    return this.connect.bind(this);
  }

  createObservableState(context?: Context): ObservableState<Store> {
    // Todo...
    return this.rawStore.state as ObservableState<Store>;
  }

  createMutableState(context?: Context): MutableState<Store> {
    // Todo...
    return this.rawStore.state as MutableState<Store>;
  }

  createObservableActions(context?: Context): ObservableActions<Store> {
    // Todo...
    return this.rawStore.state as ObservableActions<Store>;
  }

  createExecutableActions(context?: Context): ExecutableActions<Store> {
    // Todo...
    return this.rawStore.state as ExecutableActions<Store>;
  }

  addObservableStateMiddleware(callback: ObservableMiddleware): void {
    // Todo...
  }

  addMutableStateMiddleware(callback: MutableMiddleware): void {
    // Todo...
  }

  addObservableActionsMiddleware(callback: ObservableMiddleware): void {
    // Todo...
  }

  addExecutableActionsMiddleware(callback: ExecutableMiddleware): void {
    // Todo...
  }
}

export default Store;
