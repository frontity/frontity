import { proxyToRaw, rawToProxy } from "./internals";
import { storeObservable } from "./store";
import * as builtIns from "./builtIns";
import baseHandlers from "./handlers";

export const ROOT = Symbol("ROOT");

function createObservable(obj, root) {
  // if it is a complex built-in object or a normal object, wrap it
  const handlers = builtIns.getHandlers(obj) || baseHandlers;
  const observable = new Proxy(obj, handlers);
  // save these to switch between the raw object and the wrapped object with ease later

  // This should only be saved the first time that we creat the store
  // TODO: add a test case for that

  if (!observable[ROOT]) {
    Object.defineProperty(observable, ROOT, {
      enumerable: false,
      value: root
    });
  }

  rawToProxy.set(obj, observable);
  proxyToRaw.set(observable, obj);

  // init basic data structures to save and cleanup later (observable.prop -> reaction) connections
  storeObservable(obj);
  return observable;
}

export function observable(obj = {}, root = null) {
  // if there's no root passed this is a root observable.
  if (root === null) root = obj;
  // if it is already an observable or it should not be wrapped, return it
  if (proxyToRaw.has(obj) || !builtIns.shouldInstrument(obj)) {
    return obj;
  }
  // if it already has a cached observable wrapper, return it
  // otherwise create a new observable
  return rawToProxy.get(obj) || createObservable(obj, root);
}

export function isObservable(obj) {
  return proxyToRaw.has(obj);
}

export function raw(obj) {
  return proxyToRaw.get(obj) || obj;
}
