import { proxyToRaw, rawToProxy, rawToRoot } from "./internals";
import { storeObservable } from "./store";
import * as builtIns from "./builtIns";
import baseHandlers from "./handlers";

const TARGET = Symbol("TARGET");

function createObservable(obj, root, path, context) {
  // if it is a complex built-in object or a normal object, wrap it
  const handlers = builtIns.getHandlers(obj) || baseHandlers;
  const observable = new Proxy({
    state: obj,
    context,
    path
  }, handlers);
  // save these to switch between the raw object and the wrapped object with ease later
  rawToProxy.set(obj, observable);
  proxyToRaw.set(observable, obj);
  rawToRoot.set(obj, root);
  // init basic data structures to save and cleanup later (observable.prop -> reaction) connections
  storeObservable(obj);

  observable[TARGET].state = obj;
  return observable;
}

function observable(obj = {}, root = null, path = 'state', context) {
  // if there's no root passed this is a root observable.
  if (root === null) root = obj;
  // if it is already an observable or it should not be wrapped, return it
  if (proxyToRaw.has(obj) || !builtIns.shouldInstrument(obj)) {
    return obj;
  }
  // if it already has a cached observable wrapper, return it
  // otherwise create a new observable
  return rawToProxy.get(obj) || createObservable(obj, root, path, context);
}

function isObservable(obj) {
  return proxyToRaw.has(obj);
}

function raw(obj) {
  return proxyToRaw.get(obj) || obj;
}

export { raw, isObservable, observable, TARGET };