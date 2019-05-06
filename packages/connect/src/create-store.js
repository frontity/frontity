import RecursiveIterator from "recursive-iterator";
import { observable } from "./observable";

const convertToAction = (fn, state) => (...args) => {
  const res = fn(state);
  if (typeof res === "function") {
    res(...args);
  }
};

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
    actions: convertedActions
  };
};
