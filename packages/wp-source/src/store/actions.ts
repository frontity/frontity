import { Action, ArchiveData, Data } from "../types";

export const fetch: Action<{
  name: string;
  page?: number;
  isPopulated?: boolean;
}> = async (ctx, { name, page, isPopulated }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  // return if the data that it's about to be fetched already exists
  if (!page && state.data[name]) return;
  if (page && state.data[name] && (<ArchiveData>state.data[name]).page[page])
    return;

  // init data
  const nameData: Data = state.data[name] || {
    isFetching: true
  };
  state.data[name] = nameData; // asign it back

  const { handler, params } = effects.resolver.match(ctx, { name, page });

  try {
    await handler(ctx, { name, params, page, isPopulated });
  } catch (e) {
    console.warn(`an error ocurred fetching '${name}'`, e);
    Object.assign(state.data[name], {
      is404: true
    });
  }

  nameData.isFetching = false;
};
