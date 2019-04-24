import { Action, ArchiveData, Data } from "../types";

export const fetch: Action<{
  name: string;
  page?: number;
  isPopulated?: boolean;
}> = async (ctx, { name, page, isPopulated }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;
  
  let data = state.data[name];

  // return if the data that it's about to be fetched already exists
  if (data && !page) return;
  if (data && page && data.isArchive && data.page[page]) return;

  // init data
  state.data[name] = data || {
    isFetching: true
  };

  const { handler, params } = effects.resolver.match(ctx, { name, page });

  try {
    await handler(ctx, { name, params, page, isPopulated });
  } catch (e) {
    console.warn(`an error ocurred fetching '${name}'`, e);
    Object.assign(state.data[name], {
      is404: true
    });
  }

  state.data[name].isFetching = false;
};
