import {
  observable,
  raw,
  setHandlers,
  defaultHandlers,
  isObservable,
} from "@nx-js/observer-util";

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

setHandlers({
  get: (target, key, receiver) => {
    // if it's a function, return the result of that function run with the root state.
    if (!Array.isArray(target) && typeof target[key] === "function") {
      const state = proxyToRoot.get(receiver);
      return target[key]({ state });
    }

    const result = defaultHandlers.get(target, key, receiver);

    if (
      typeof result === "object" &&
      result !== null &&
      !isObservable(result)
    ) {
      const observableChildren = observable(result);
      const root = proxyToRoot.get(receiver);
      proxyToRoot.set(observableChildren, root);
    }

    return result;
  },
});

export const createStore = (store) => {
  const observableState = observable(store.state);
  proxyToRoot.set(observableState, observableState);
  const instance = {
    ...store,
    state: observableState,
    actions: {},
  };
  const newActions = convertedActions(store.actions, instance);
  Object.assign(instance.actions, newActions);
  return instance;
};
