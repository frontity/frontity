/* eslint-disable @typescript-eslint/camelcase */
import { unstable_batchedUpdates } from "react-dom";

const globalObj = typeof window !== "undefined" ? window : global;

// this runs the passed function and delays all re-renders
// until the function is finished running
export function batch(fn, ctx, args) {
  let result;
  unstable_batchedUpdates(() => (result = fn.apply(ctx, args)));
  return result;
}

// this creates and returns a batched version of the passed function
// the cache is necessary to always map the same thing to the same function
// which makes sure that addEventListener/removeEventListener pairs don't break
const cache = new WeakMap();
function batchFn(fn) {
  if (typeof fn !== "function") {
    return fn;
  }
  let batched = cache.get(fn);
  if (!batched) {
    batched = function(...args) {
      return batch(fn, this, args);
    };
    cache.set(fn, batched);
  }
  return batched;
}

// batched obj.addEventListener(cb) like callbacks
function batchMethodCallbacks(obj, method) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, method);
  if (
    descriptor &&
    descriptor.writable &&
    typeof descriptor.value === "function"
  ) {
    obj[method] = new Proxy(descriptor.value, {
      apply(target, ctx, args) {
        return Reflect.apply(target, ctx, args.map(batchFn));
      }
    });
  }
}

function batchMethodsCallbacks(obj, methods) {
  methods.forEach(method => batchMethodCallbacks(obj, method));
}

// batches obj.onevent = fn like calls
function batchMethod(obj, method) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, method);
  if (descriptor && descriptor.configurable) {
    const newDescriptor = Object.assign({}, descriptor, {
      set(value) {
        return descriptor.set.call(this, batchFn(value));
      }
    });
    Object.defineProperty(obj, method, newDescriptor);
  }
}

function batchMethods(obj, methods) {
  methods.forEach(method => batchMethod(obj, method));
}

// do a sync batching for the most common task sources
// this should be removed when React's own batching is improved in the future

// batch timer functions
batchMethodsCallbacks(globalObj, [
  "setTimeout",
  "setInterval",
  "requestAnimationFrame",
  "requestIdleCallback"
]);

if (globalObj.Promise) {
  batchMethodsCallbacks(Promise.prototype, ["then", "catch"]);
}

// batch addEventListener calls
if (globalObj.EventTarget) {
  batchMethodsCallbacks(EventTarget.prototype, [
    "addEventListener",
    "removeEventListener"
  ]);
}

// this batches websocket event handlers
if (globalObj.WebSocket) {
  batchMethods(WebSocket.prototype, [
    "onopen",
    "onmessage",
    "onerror",
    "onclose"
  ]);
}
