import { Action, ArchiveData, Data } from "../types";

export const fetch: Action<{
  name: string;
  page?: number;
}> = async (ctx, { name, page }) => {
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
  await handler(ctx, { name, params, page });
  nameData.isFetching = false;
};
