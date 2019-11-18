/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  StoreType,
  ObservableState,
  MutableState,
  ObservableActions,
  ExecutableActions
} from "../types";

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

class Store<Store extends StoreType> {
  rawStore: Store;

  constructor(rawStore: Store, options?: Options) {
    this.rawStore = rawStore;
    // Todo...
  }

  replaceStore(rawStore: Store): void {
    // We should probably use deep-overwrite here to avoid breaking the references
    // of the proxies already created.
    this.rawStore = rawStore;
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
