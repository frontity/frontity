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
  
  let data = state.data(name);

  // return if the data that it's about to be fetched already exists
  if (data && !page) return;
  if (data && page && data.isArchive && data.pages[page]) return;

  // init data
  data = state.dataMap[name] = data || {};
  data.isFetching = true;

  // get and execute the corresponding handler based on name
  const { handler, params } = effects.resolver.match(ctx, { name, page });
  try {
    await handler(ctx, { name, params, page, isPopulating });
    data.isReady = true;
  } catch (e) {
    console.warn(`an error ocurred fetching '${name}'`, e);
    data.is404 = true;
  }

  // end fetching
  data.isFetching = false;
};
