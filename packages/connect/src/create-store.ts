// @ts-ignore
import { raw, proxyHandlers } from "@nx-js/observer-util";
import { Package } from "@frontity/types";
import {
  ResolveActions,
  ResolvePackages,
  ResolveState,
} from "@frontity/types/src/utils";
import { store } from "@risingstack/react-easy-state";

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

const convertToAction = (
  fn: (instance: Package) => unknown,
  instance: Package
) => (...args: unknown[]): void | Promise<void> => {
  const first = fn(instance);
  if (first instanceof Promise) {
    return new Promise<void>((resolve, reject) =>
      first.then(() => resolve()).catch((err) => reject(err))
    );
  }
  if (typeof first === "function") {
    const second = first(...args);
    if (second instanceof Promise) {
      return new Promise<void>((resolve, reject) =>
        second.then(() => resolve()).catch((err) => reject(err))
      );
    }
  }
};

const convertedActions = <T extends Package["actions"], P extends Package>(
  obj: T,
  instance: P
): ResolveActions<T> => {
  // if (typeof obj === "function") return convertToAction(obj, instance);
  if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = convertedActions(obj[key], instance);
      return newObj;
    }, {} as ResolveActions<T>);
  }
};

/**
 * Create an Frontity Connect store.
 *
 * @param config - The plain store object.
 * @returns The initialized store.
 */
export const createStore = <T extends Package>(
  config: T
): ResolvePackages<T> => {
  // @ts-ignore
  const observableState: ResolveState<T["state"]> = store(config.state, {
    proxyHandlers: {
      get: (target, key, receiver) => {
        const result = proxyHandlers.get(target, key, receiver);

        // If it's a function, return the result of that function run with the
        // root state.
        if (!Array.isArray(target) && typeof result === "function") {
          return result({ state: observableState });
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
