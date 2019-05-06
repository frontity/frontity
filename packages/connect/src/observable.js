import { proxyToRaw, rawToProxy } from "./internals";
import { storeObservable } from "./store";
import * as builtIns from "./builtIns";
import baseHandlers from "./handlers";

function createObservable(obj) {
  // if it is a complex built-in object or a normal object, wrap it
  const handlers = builtIns.getHandlers(obj) || baseHandlers;
  const observable = new Proxy(obj, handlers);
  // save these to switch between the raw object and the wrapped object with ease later
  rawToProxy.set(obj, observable);
  proxyToRaw.set(observable, obj);
  // init basic data structures to save and cleanup later (observable.prop -> reaction) connections
  storeObservable(obj);
  return observable;
}

export function observable(obj = {}) {
  // if it is already an observable or it should not be wrapped, return it
  if (proxyToRaw.has(obj) || !builtIns.shouldInstrument(obj)) {
    return obj;
  }
  // if it already has a cached observable wrapper, return it
  // otherwise create a new observable
  return rawToProxy.get(obj) || createObservable(obj);
}

export function isObservable(obj) {
  return proxyToRaw.has(obj);
}

export function raw(obj) {
  return proxyToRaw.get(obj) || obj;
}
