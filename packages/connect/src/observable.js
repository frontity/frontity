import { proxyToRaw, rawToProxy, rawToRoot } from "./internals";
import { storeObservable } from "./store";
import handlers from "./handlers";

export const CONTEXT = Symbol("context");

function createObservable(obj, root, context) {
  const observable = new Proxy(obj, handlers);

  // store the context so that we can access it later in the handlers
  observable[CONTEXT] = context;

  // save these to switch between the raw object and the wrapped object with ease later
  rawToProxy.set(obj, context, observable);
  proxyToRaw.set(observable, obj);
  rawToRoot.set(obj, root);
  // init basic data structures to save and cleanup later (observable.prop -> reaction) connections
  storeObservable(obj);
  return observable;
}

export function observable(
  obj = {},
  root = null,
  context = { name: "test context" }
) {
  // if there's no root passed this is a root observable.
  if (root === null) root = obj;
  // if it is already an observable, return it
  if (proxyToRaw.has(obj)) {
    return obj;
  }
  // if it already has a cached observable wrapper, return it
  // otherwise create a new observable
  return rawToProxy.get(obj, context) || createObservable(obj, root, context);
}

export function isObservable(obj) {
  return proxyToRaw.has(obj);
}

export function raw(obj) {
  return proxyToRaw.get(obj) || obj;
}
