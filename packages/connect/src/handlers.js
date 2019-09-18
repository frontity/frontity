import { observable, TARGET } from "./observable";
import { proxyToRaw, rawToProxy, rawToRoot } from "./internals";
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

const isPrimitive = value =>
  value == null || (typeof value !== "function" && typeof value !== "object");

// intercept get operations on observables to know which reaction uses their properties
function get(target, key, receiver) {

  if (key === TARGET) return target;
  const state = target.state;

  // get the root of that target.
  const root = rawToRoot.get(state);

  const result =
    !Array.isArray(state) && typeof state[key] === "function"
      ? // if it's a function, return the result of that function run with the root.
      state[key]({ state: rawToProxy.get(root) })
      : // if it's not, return the real result.
      Reflect.get(state, key, receiver);
  // do not register (observable.prop -> reaction) pairs for well known symbols
  // these symbols are frequently retrieved in low level JavaScript under the hood
  if (typeof key === "symbol" && wellKnownSymbols.has(key)) {
    return result;
  }
  // register and save (observable.prop -> runningReaction)
  registerRunningReactionForOperation({ state, key, receiver, type: "get" });
  // if we are inside a reaction and observable.prop is an object wrap it in an observable too
  // this is needed to intercept property access on that object too (dynamic observable tree)
  const observableResult = rawToProxy.get(result);
  if (typeof result === "object" && result !== null) {
    if (observableResult) {
      return observableResult;
    }
    // do not violate the none-configurable none-writable prop get handler invariant
    // fall back to none reactive mode in this case, instead of letting the Proxy throw a TypeError
    const descriptor = Reflect.getOwnPropertyDescriptor(state, key);
    if (
      !descriptor ||
      !(descriptor.writable === false && descriptor.configurable === false)
    ) {
      return observable(result, state.context, `${state.path}.${key}`);
    }
  }
  // otherwise return the observable wrapper if it is already created and cached or the raw object
  return observableResult || result;
}

function has(target, key) {
  const state = target.state;
  const result = Reflect.has(state, key);
  // register and save (observable.prop -> runningReaction)
  registerRunningReactionForOperation({ state, key, type: "has" });
  return result;
}

function ownKeys(target) {
  const state = target.state
  registerRunningReactionForOperation({ state, type: "iterate" });
  return Reflect.ownKeys(state);
}

// intercept set operations on observables to know when to trigger reactions
function set(target, key, value, receiver) {
  const state = target.state;
  // make sure to do not pollute the raw object with observables
  if (typeof value === "object" && value !== null) {
    value = proxyToRaw.get(value) || value;
  }
  // save if the object had a descriptor for this key
  const hadKey = hasOwnProperty.call(state, key);
  // save if the value changed because of this set operation
  const oldValue = state[key];
  // execute the set operation before running any reaction
  const result = Reflect.set(state, key, value, receiver);
  // do not queue reactions if the target of the operation is not the raw receiver
  // (possible because of prototypal inheritance)
  if (state !== proxyToRaw.get(receiver)) {
    return result;
  }
  // queue a reaction if it's a new property or its value changed
  if (!hadKey) {
    queueReactionsForOperation({ state, key, value, receiver, type: "add" });
  } else if (value !== oldValue) {
    queueReactionsForOperation({
      state,
      key,
      value,
      oldValue,
      receiver,
      type: "set"
    });
  }

  if (!isPrimitive(value)) {
    observable(value, target.context, `${target.path}.${key}`);
  }
  return result;
}

function deleteProperty(target, key) {
  const state = target.state;
  // save if the object had the key
  const hadKey = hasOwnProperty.call(state, key);
  const oldValue = state[key];
  // execute the delete operation before running any reaction
  const result = Reflect.deleteProperty(state, key);
  // only queue reactions for delete operations which resulted in an actual change
  if (hadKey) {
    queueReactionsForOperation({ state, key, oldValue, type: "delete" });
  }
  return result;
}

export default { get, has, ownKeys, set, deleteProperty };
