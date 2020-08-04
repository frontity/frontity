/* eslint-disable jsdoc/require-jsdoc */
import { raw, isObservable, proxyHandlers } from "@nx-js/observer-util";
import { store } from "@risingstack/react-easy-state";

export const getSnapshot = (obj) => {
  obj = raw(obj);
  if (typeof obj === "function") return;
  if (typeof obj !== "object" || obj === null) return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) {
    return obj.reduce((arr, item, i) => {
      arr[i] = getSnapshot(item);
      return arr;
    }, []);
  }
  if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj, key) => {
      const res = getSnapshot(obj[key]);
      if (res !== undefined) newObj[key] = res;
      return newObj;
    }, {});
  }
};

const convertToAction = (fn, instance) => (...args) => {
  const first = fn(instance);
  if (first instanceof Promise) {
    return new Promise((resolve, reject) =>
      first.then(() => resolve()).catch((err) => reject(err))
    );
  }
  if (typeof first === "function") {
    const second = first(...args);
    if (second instanceof Promise) {
      return new Promise((resolve, reject) =>
        second.then(() => resolve()).catch((err) => reject(err))
      );
    }
  }
};

const convertedActions = (obj, instance) => {
  if (typeof obj === "function") return convertToAction(obj, instance);
  else if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = convertedActions(obj[key], instance);
      return newObj;
    }, {});
  }
};

const proxyToRoot = new WeakMap();

const handlers = {
  proxyHandlers: {
    get: (target, key, receiver) => {
      // If it's a function, return the result of that function run with the root
      // state.
      if (!Array.isArray(target) && typeof target[key] === "function") {
        const state = proxyToRoot.get(receiver);
        return target[key]({ state });
      }

      const result = proxyHandlers.get(target, key, receiver);

      // If it's an object, generate the observable ourselves so we can store the
      // reference to the root for the derived state.
      if (
        typeof result === "object" &&
        result !== null &&
        !isObservable(result)
      ) {
        const observableChildren = store(result, handlers);
        const root = proxyToRoot.get(receiver);
        proxyToRoot.set(observableChildren, root);
      }

      return result;
    },
  },
};

export const createStore = (config) => {
  const observableState = store(config.state, handlers);
  proxyToRoot.set(observableState, observableState);
  const instance = {
    ...config,
    state: observableState,
    actions: {},
  };
  const newActions = convertedActions(config.actions, instance);
  Object.assign(instance.actions, newActions);
  return instance;
};
