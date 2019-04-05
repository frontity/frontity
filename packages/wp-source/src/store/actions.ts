import { Fetch, Register } from "./types";

export const fetch: Fetch = async (store, { name, page = 1 }) => {
  // Find the handler function that matches the name
  const { resolver } = store.effects.source;
  const { handler, params } = resolver.match(name);

  // Then executes the matching handler
  if (handler) await handler(store, { name, params, page });
};

export const register: Register = ({ effects }, { pattern, handler }) => {
  const { resolver } = effects.source;
  resolver.add(pattern, handler);
};

export const populate = ({ state }) => {
  state.source.isPopulated = true;
};
