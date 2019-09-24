import { observable, ROOT } from "./observable";
import { proxyToRaw, rawToProxy } from "./internals";
import {
  registerRunningReactionForOperation,
  queueReactionsForOperation
} from "./reactionRunner";

const hasOwnProperty = Object.prototype.hasOwnProperty;
const wellKnownSymbols = new Set(
  Object.getOwnPropertyNames(Symbol)
    .map(key => Symbol[key])
    .filter(value => typeof value === "symbol")
);

const isObject = val => val != null && typeof val === "object";

const isPrimitive = value =>
  value == null || (typeof value !== "function" && typeof value !== "object");

function deepOverwrite(a, b) {
  // Delete the props of a that are not in b.
  Object.keys(a).forEach(key => {
    if (typeof b[key] === "undefined") {
      // save the old value
      const oldValue = a[key];

      // Delete the key.
      delete a[key];

      // Trigger a delete reaction.
      queueReactionsForOperation({
        target: a,
        key,
        oldValue,
        type: "delete"
      });
    }
  });

  Object.keys(b).forEach(key => {
    // If that key doesn't exist, we add it.
    if (typeof a[key] === "undefined") {
      a[key] = b[key];
      queueReactionsForOperation({
        target: a,
        key,
        value: b[key],
        type: "add"
      });
    } else if (isPrimitive(b[key])) {
      // only update the value and trigger a reaction if the
      // new value differs from the old one
      if (a[key] !== b[key]) {
        // save the old value
        const oldValue = a[key];

        a[key] = b[key];
        queueReactionsForOperation({
          target: a,
          key,
          value: b[key],
          oldValue,
          type: "set"
        });
      }

      // If it's an object, we deepOverwrite it again.
    } else {
      // We have to create a new observable every time we descend again
      observable(a[key], a);
      deepOverwrite(a[key], b[key]);
    }
  });
}

// intercept get operations on observables to know which reaction uses their properties
function get(target, key, receiver) {
  // We need a way to return the target, to be able to mutate change the
  // reference of the state.
  if (key === ROOT) return target[ROOT];
  // get the root of that target.
  const root = target[ROOT];

  const result =
    !Array.isArray(target) && typeof target[key] === "function"
      ? // if it's a function, return the result of that function run with the root.
        target[key]({
          state: rawToProxy.get(root)
        })
      : // if it's not, return the real result.
        Reflect.get(target, key, receiver);
  // do not register (observable.prop -> reaction) pairs for well known symbols
  // these symbols are frequently retrieved in low level JavaScript under the hood
  if (typeof key === "symbol" && wellKnownSymbols.has(key)) {
    return result;
  }
  // register and save (observable.prop -> runningReaction)
  registerRunningReactionForOperation({
    target,
    key,
    receiver,
    type: "get"
  });
  // if we are inside a reaction and observable.prop is an object wrap it in an observable too
  // this is needed to intercept property access on that object too (dynamic observable tree)
  const observableResult = rawToProxy.get(result);
  if (typeof result === "object" && result !== null) {
    if (observableResult) {
      return observableResult;
    }
    // do not violate the none-configurable none-writable prop get handler invariant
    // fall back to none reactive mode in this case, instead of letting the Proxy throw a TypeError
    const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
    if (
      !descriptor ||
      !(descriptor.writable === false && descriptor.configurable === false)
    ) {
      return observable(result, root);
    }
  }
  // otherwise return the observable wrapper if it is already created and cached or the raw object
  return observableResult || result;
}

function has(target, key) {
  const result = Reflect.has(target, key);
  // register and save (observable.prop -> runningReaction)
  registerRunningReactionForOperation({ target, key, type: "has" });
  return result;
}

function ownKeys(target) {
  registerRunningReactionForOperation({ target, type: "iterate" });
  return Reflect.ownKeys(target);
}

// intercept set operations on observables to know when to trigger reactions
function set(target, key, value, receiver) {
  // We're just storing the reference to the root of the state tree
  // This is just for internal use - no need to do anything else
  if (key === ROOT) {
    return Reflect.set(target, key, value, receiver);
  }

  // make sure to do not pollute the raw object with observables
  if (typeof value === "object" && value !== null) {
    value = proxyToRaw.get(value) || value;
  }

  // save if the object had a descriptor for this key
  const hadKey = hasOwnProperty.call(target, key);
  // save if the value changed because of this set operation
  const oldValue = target[key];

  // do not queue reactions if the target of the operation is not the raw receiver
  // (possible because of prototypal inheritance)
  if (target !== proxyToRaw.get(receiver)) {
    // execute the set operation before running any reaction
    return Reflect.set(target, key, value, receiver);
  }

  // If both the old value and the new value are objects, deepOverwrite.
  if (isObject(oldValue) && isObject(value)) {
    observable(Reflect.get(target, key, value, receiver), target);
    deepOverwrite(oldValue, value);
    // TODO: not sure if we can just return `true` here
    return true;
  }

  // if we're here, the value should not be an object, so we can set it
  const result = Reflect.set(target, key, value, receiver);

  // queue a reaction if it's a new property or its value changed
  if (!hadKey) {
    queueReactionsForOperation({ target, key, value, receiver, type: "add" });
  } else if (value !== oldValue) {
    queueReactionsForOperation({
      target,
      key,
      value,
      oldValue,
      receiver,
      type: "set"
    });
  }
  return result;
}

function deleteProperty(target, key) {
  // save if the object had the key
  const hadKey = hasOwnProperty.call(target, key);
  const oldValue = target[key];
  // execute the delete operation before running any reaction
  const result = Reflect.deleteProperty(target, key);
  // only queue reactions for delete operations which resulted in an actual change
  if (hadKey) {
    queueReactionsForOperation({ target, key, oldValue, type: "delete" });
  }
  return result;
}

export default { get, has, ownKeys, set, deleteProperty };
