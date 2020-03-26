import { observable } from "./observable";

const getSnapshot = (obj) => {
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

export const createStore = (store) => {
  const observableState = observable(store.state);
  const instance = {
    ...store,
    state: observableState,
    actions: {},
    getSnapshot: () => getSnapshot(store.state),
  };
  const newActions = convertedActions(store.actions, instance);
  Object.assign(instance.actions, newActions);
  return instance;
};
