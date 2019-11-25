/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  StoreType,
  ObservableState,
  MutableState,
  ObservableActions,
  ExecutableActions,
  StoreOptions,
  Owner,
  ObservableMiddlewareCallback,
  MutableMiddlewareCallback,
  ExecutableMiddlewareCallback
} from "../types";

class Store<Store extends StoreType> {
  rawStore: Store;

  constructor(rawStore: Store, options?: StoreOptions) {
    this.rawStore = rawStore;
    // Todo...
  }

  replaceStore(rawStore: Store): void {
    // We should probably use deep-overwrite here to avoid breaking the references
    // of the proxies already created.
    this.rawStore = rawStore;
  }

  createObservableState(owner?: Owner): ObservableState<Store> {
    // Todo...
    return this.rawStore.state as ObservableState<Store>;
  }

  createMutableState(owner?: Owner): MutableState<Store> {
    // Todo...
    return this.rawStore.state as MutableState<Store>;
  }

  createObservableActions(owner?: Owner): ObservableActions<Store> {
    // Todo...
    return this.rawStore.state as ObservableActions<Store>;
  }

  createExecutableActions(owner?: Owner): ExecutableActions<Store> {
    // Todo...
    return this.rawStore.state as ExecutableActions<Store>;
  }

  addObservableStateMiddleware(callback: ObservableMiddlewareCallback): void {
    // Todo...
  }

  addMutableStateMiddleware(callback: MutableMiddlewareCallback): void {
    // Todo...
  }

  addObservableActionsMiddlewareCallback(
    callback: ObservableMiddlewareCallback
  ): void {
    // Todo...
  }

  addExecutableActionsMiddleware(callback: ExecutableMiddlewareCallback): void {
    // Todo...
  }
}

export default Store;
