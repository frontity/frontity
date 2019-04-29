import { Action } from "../types";
import { normalizeName } from "./helpers";

export const fetch: Action<{
  name: string;
  page?: number;
  isPopulating?: boolean;
}> = async (ctx, { name, page, isPopulating }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  // transform links to names
  name = normalizeName(name)
  
  const data = state.data(name);

  // return if the data that it's about to be fetched already exists
  if (data && !page) return;
  if (data && page && data.isArchive && data.pages[page]) return;

  // init data if needed
  if (!data) state.dataMap[name] = {};

  try {
    // get and execute the corresponding handler based on name
    const { handler, params } = effects.resolver.match(ctx, { name, page });
    await handler(ctx, { name, params, page, isPopulating });
    state.dataMap[name].isReady = true;
  } catch (e) {
    console.warn(`An error ocurred fetching '${name}:'\n`, e);
    state.dataMap[name].is404 = true;
  }

  // end fetching
  state.dataMap[name].isFetching = false;
};
