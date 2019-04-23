import { Action, DataArchive, Data } from "../types";

export const fetch: Action<{
  name: string;
  page?: number;
}> = async (ctx, { name, page }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  // return if the data that it's about to be fetched already exists
  if (!page && state.data[name]) return;
  if (page && state.data[name] && (<DataArchive>state.data[name]).page[page])
    return;

  // init data
  const nameData: Data = state.data[name] || {
    isFetching: true
  };
  state.data[name] = nameData; // asign it back

  const { handler, params } = effects.resolver.match(ctx, { name, page });
  await handler(ctx, { name, params, page });
  nameData.isFetching = false;
};

export const populate: Action<{
  entities: any;
}> = async (ctx, { entities }) => {
  const { state, actions } = ctx;

  for (let [, single] of Object.entries(entities)) {
    for (let [, entity] of Object.entries(single)) {
      const { type, id, link } = entity;
      const name = new URL(link).pathname;
      state.source[type][id] = entity;
      await fetch(ctx, { name });
    }
  }
};

// for (let [, single] of Object.entries(entities)) {
//   for (let [, entity] of Object.entries(single)) {
//     const { type, id, link } = entity;
//     const name = new URL(link).pathname;
//     state.source[type][id] = entity;
//     await actions.source.fetch({ name });
//   }
// }

// // I'm not sure this should be an action anymore
// export const register: Action<{
//   pattern: string;
//   handler: Handler;
// }> = (ctx, { pattern, handler }) => {
//   const effects = ctx.effects.source;
//   // or just the effect right below
//   effects.resolver.add(pattern, handler);
// };
