import { Fetch, Handler, Register } from "./types";

// this is not in the store...
const handlers: { [key: string]: Handler } = {};
// const compiled: {};

// "fetch" action:
// retrieves entities using a path or a name
export const fetch: Fetch = async (store, { name, page = 1 }) => {
  // Find the handler function that matches the name
  const { isMatch, exec } = store.effects.source;
  const matched = Object.keys(handlers).find(pattern =>
    isMatch(name, pattern)
  );

  // Get params
  const params = exec(name, matched);

  // Then executes the matched handler
  handlers[matched](store, { name, params, page });
};

// "register" action:
// attaches a function to handle a specified name or route pattern
export const register: Register = (store, { pattern, handler }) => {
  handlers[`${pattern}`] = handler;
};

export const populate = ({ state }) => {
  state.source.isPopulated = true;
};
