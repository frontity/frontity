import { raw, proxyHandlers } from "@frontity/observer-util";
import { store } from "@frontity/react-easy-state";

/**
 * Extracts an snapshot from the current state that can be serialized and sent
 * to the client.
 *
 * @param obj - The state object.
 * @returns The same object, but cloned and serializable.
 */
export const getSnapshot = (obj) => {
  obj = raw(obj);
  if (typeof obj === "function") return;
  if (typeof obj !== "object" || obj === null) return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (Array.isArray(obj)) {
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

/**
 * Convert a Frontity action definition in a final Frontity action that can be
 * consumed by other actions or React components.
 *
 * @param action - The action.
 * @param store - The store.
 * @returns The action ready to be used with the injected store.
 */
const convertToAction = (action, store) => (...args) => {
  const first = action(store);
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

/**
 * Convert an object of actions in the final Frontity `actions` object that can
 * be consumed by other actions or React components.
 *
 * @param actions - The object containing all the actions.
 * @param store - The store.
 * @returns The same object but will all the actions connected to the store.
 */
const convertedActions = (actions, store) => {
  if (typeof actions === "function") return convertToAction(actions, store);
  if (actions instanceof Object) {
    return Object.keys(actions).reduce((newObj, key) => {
      newObj[key] = convertedActions(actions[key], store);
      return newObj;
    }, {});
  }
};

/**
 * A list of internal JavaScript symbols that should be skipped.
 */
const wellKnownSymbols = new Set(
  Object.getOwnPropertyNames(Symbol)
    .map((key) => Symbol[key])
    .filter((value) => typeof value === "symbol")
);

/**
 * Create an Frontity Connect store.
 *
 * @param config - The plain store object.
 * @returns The initialized store.
 */
export const createStore = (config) => {
  const observableState = store(config.state, {
    proxyHandlers: {
      get: (target, key, receiver) => {
        const result = proxyHandlers.get(target, key, receiver);

        // Do not try to run derived functions for internal JS symbols and
        // utils.
        if (
          (typeof key === "symbol" && wellKnownSymbols.has(key)) ||
          key === "constructor"
        ) {
          return result;
        }

        // If it's a function, return the result of that function run with the
        // root state and libraries.
        if (!Array.isArray(target) && typeof result === "function") {
          return result({
            state: observableState,
            libraries: config.libraries,
          });
        }

        return result;
      },
    },
  });
  const instance = {
    ...config,
    state: observableState,
    actions: {},
  };
  const newActions = convertedActions(config.actions, instance);
  Object.assign(instance.actions, newActions);
  return instance;
};
