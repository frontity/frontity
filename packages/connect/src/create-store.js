import { observable } from "./observable";
import { isFunction, isArray, isPlainObject } from "./utils";

const getSnapshot = obj => {
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

const convertToAction = (fn, instance, context) => (...args) => {
  fn = observable(fn, null, context);
  const first = fn(instance);
  if (first instanceof Promise)
    return new Promise(resolve => first.then(() => resolve()));
  if (typeof first === "function") {
    const second = first(...args);
    if (second instanceof Promise)
      return new Promise(resolve => second.then(() => resolve()));
  }
};

const convertedActions = (obj, instance, context) => {
  if (typeof obj === "function") return convertToAction(obj, instance, context);
  else if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = convertedActions(obj[key], instance);
      return newObj;
    }, {});
  }
};

export const createStore = (store, context) => {
  // TODO: onl throw in dev ?
  if (!(isFunction(store) || isPlainObject(store) || isArray(store)))
    throw new Error(
      `The store must be a plain object containing only functions, arrays or other objects!`
    );

  const observableState = observable(store.state, null, context);
  const instance = {
    ...store,
    state: observableState,
    actions: {},
    getSnapshot: () => getSnapshot(store.state)
  };
  const actions = convertedActions(store.actions, instance, context);
  Object.assign(instance.actions, actions);
  return instance;
};
