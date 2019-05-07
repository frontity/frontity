import { observable } from "./observable";

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

const convertToAction = (fn, state) => (...args) => {
  const res = fn(state);
  if (typeof res === "function") {
    res(...args);
  }
};

const convertedActions = (obj, state) => {
  if (typeof obj === "function") return convertToAction(obj, state);
  else if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = convertedActions(obj[key], state);
      return newObj;
    }, {});
  }
};

export const createStore = ({ state, actions }) => {
  const observableState = observable(state);
  return {
    state: observableState,
    actions: convertedActions(actions, observableState),
    getSnapshot: () => getSnapshot(state)
  };
};
