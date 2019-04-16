import { Action } from "./types";

export const fetch: Action<{
  name: string;
  page?: number;
}> = async (ctx, { name, page }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  // return if the data that it's about to be fetched already exists
  if (!page && state.data[name]) return;
  if (page && state.data[name] && state.data[name].page[page]) return;

  // init data
  const nameData: any = state.data[name] || {};
  state.data[name] = nameData; // asign it back

  nameData.isFetching = true;
  const { handler, params } = effects.resolver.match(ctx, { name, page });
  handler(ctx, { name, params, page });
  nameData.isFetching = false;
};

export const populate: Action<{
  entities: any[] | any;
}> = ({ state, actions }, { entities }) =>
  Promise.all(
    Object.entries(entities).map(([, single]) =>
      Promise.all(
        Object.entries(single).map(async ([, entity]) => {
          const { type, id, link } = entity;
          const name = new URL(link).pathname;
          state.source[type][id] = entity;
          await actions.source.fetch({ name });
        })
      )
    )
  );

// // I'm not sure this should be an action anymore
// export const register: Action<{
//   pattern: string;
//   handler: Handler;
// }> = (ctx, { pattern, handler }) => {
//   const effects = ctx.effects.source;
//   // or just the effect right below
//   effects.resolver.add(pattern, handler);
// };
