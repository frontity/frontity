import { State, Action, Package } from "../../types/src";

type Context = {
  name: string;
  path: string;
  componentName?: string;
  type: "state" | "action";
  // TODO: some more properties are still coming here
};

type Middleware = (
  ctx: Context,
  state: Record<string, any>,
  actions: Record<string, any>,
  next: Action<Package> | Middleware
) => {};

export const middlewares: Middleware[] = [];

export function compose(middlewares: [Middleware]) {
  if (!Array.isArray(middlewares))
    throw new TypeError(`Middleware stack must be an array!`);
  for (const fn of middlewares) {
    if (typeof fn !== "function")
      throw new TypeError(`Middleware must be composed of functions!`);
  }

  return function(
    context: Context,
    state: State<Package>,
    actions: Action<Package>,
    next: Middleware
  ) {
    // last called middleware #
    let index = -1;

    function dispatch(i: number) {
      if (i <= index)
        return Promise.reject(new Error(`next() called multiple times`));
      index = i;
      let fn = middlewares[i];
      if (i === middlewares.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(
          fn(context, state, actions, dispatch.bind(null, i + 1))
        );
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return dispatch(0);
  };
}

export function addMiddleware(fn: Middleware) {
  if (typeof fn !== "function")
    throw new TypeError("middleware must be a function!");
  middlewares.push(fn);
}
