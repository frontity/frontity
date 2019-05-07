import RecursiveIterator from "recursive-iterator";
import { observable } from "./observable";

const convertToAction = (fn, state) => (...args) => {
  const res = fn(state);
  if (typeof res === "function") {
    res(...args);
  }
};

function getSnapshot(obj) {
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
}

export const createStore = ({ state, actions }) => {
  const observableState = observable(state);

  const convertedActions = {};

  for (let { node, path } of new RecursiveIterator(actions)) {
    if (typeof node === "function") {
      let base = convertedActions;
      for (let i = 0; i < path.length - 1; i++) {
        if (!base[path[i]]) base[path[i]] = {};
        base = base[path[i]];
      }
      const key = path[path.length - 1];
      base[key] = convertToAction(node, observableState);
    }
  }

  return {
    state: observableState,
    actions: convertedActions,
    getSnapshot: () => getSnapshot(state)
  };
};
