import { Fetch, Register, Get, Populate, Entity } from "./types";

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

export const get: Get = async ({ state, effects }, { endpoint, params }) => {
  const { siteUrl, isWpCom } = state.settings.packages["wp-source"];
  return effects.source.api.get({ endpoint, params, siteUrl, isWpCom });
};

export const populate: Populate = ({ state }, { name, entities, page }) => {
  // Init instance if it doesn't exist yet
  state.source.name[name] = state.source.name[name] || {};

  if (entities instanceof Array) {
    entities.forEach((entity: Entity) => {
      // Get name from link property
      const name = new URL(entity.link).pathname;
      // const type = entity.type || entity.taxonomy;
      const id = entity.id;
    })
  }
};
