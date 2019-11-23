/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  StoreType,
  ObservableState,
  MutableState,
  ObservableActions,
  ExecutableActions,
  StoreOptions,
  Context,
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
