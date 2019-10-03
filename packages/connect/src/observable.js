import { proxyToRaw, rawToProxy, rawToRoot } from "./internals";
import { storeObservable } from "./store";
import * as builtIns from "./builtIns";
import baseHandlers from "./handlers";

function createObservable(obj, root) {
  // if it is a complex built-in object or a normal object, wrap it
  const handlers = builtIns.getHandlers(obj) || baseHandlers;
  const observable = new Proxy(obj, handlers);
  // save these to switch between the raw object and the wrapped object with ease later
  rawToProxy.set(obj, observable);
  proxyToRaw.set(observable, obj);
  rawToRoot.set(obj, root);
  // init basic data structures to save and cleanup later (observable.prop -> reaction) connections
  storeObservable(obj);
  return observable;
}

export function observable(obj = {}, root = null, context = null) {
  // if there's no root passed this is a root observable.

  if (root === null) root = obj;
  // if it is already an observable or it should not be wrapped, return it
  if (proxyToRaw.has(obj)) {
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
