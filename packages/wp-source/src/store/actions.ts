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

export const populate: Populate = (
  { state, actions },
  { name, entities, page }
) => {
  if (entities instanceof Array) {
    state.source.name[name].pages[page] = [];

    entities.forEach((entity: Entity) =>
      actions.source.populate({
        name: new URL(entity.link).pathname,
        entities: entity
      })
    );
  } else {
    // Separate entity from embedded
    const { _embedded: embedded, ...entity } = entities;

    // Get props from entity
    let { taxonomy, type, id } = entity;
    type = type || taxonomy || 'author';

    // Asociate name with type and id
    state.source.name[name] = { type, id };

    // Add entity to state.source[type][id]
    if (type === "post_tag") state.source.tag[id] = entity;
    else if (type) state.source[type][id] = entity;
    else state.source.author[id] = entity;

    // Process embedded
    if (embedded) {
      // Populate author
      const [author] = embedded.author;
      actions.source.populate({
        name: new URL(author.link).pathname,
        entities: author
      });

      // Populate featured media (if it exists)
      if (embedded["wp:featuredmedia"]) {
        const [featured] = embedded["wp:featuredmedia"];
        actions.source.populate({
          name: new URL(featured.link).pathname,
          entities: featured
        });
      }

      // Populate categories and tags
      if (embedded["wp:term"]) {
        const [terms] = embedded["wp:term"];
        terms.forEach((term: Entity) =>
          actions.source.populate({
            name: new URL(term.link).pathname,
            entities: term
          })
        );
      }
    }
  }
};
