import { Handler } from "../../types";
import { getIdBySlug, populate, getTotal, getTotalPages } from "../helpers";

// CASES:
// 1. !data.isAuthor
// 2. !isPopulating && data.isAuthor && !data.pages[page - 1]

const tagHandler: Handler = async (
  ctx,
  { name, params, page = 1, isPopulating }
) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;
  
  // 0. Get data from store
  let data = state.data(name);

  // 1. init data if it isn't already
  if (!data.isAuthor) {
    // Search id in state or get it from WP REST API
    const id = await getIdBySlug(ctx, "author", params.slug);

    data = {
      id,
      pages: [],
      isArchive: true,
      isAuthor: true,
      isFetching: true,
    };

    state.dataMap[name] = data;
  }

  // 2. If data is a Tag, then all data is populated
  if (!isPopulating && data.isAuthor && !data.pages[page - 1]) {
    // here we know the id!!
    const { id } = data;
    // and we don't need to init data
    // just get the page we are requesting
    const response = await effects.api.get({
      endpoint: "posts",
      params: { author: id, search: params.s, page, _embed: true }
    });
    // populate response and add page to data
    data.pages[page - 1] = await populate(ctx, response);
    // and assign total and totalPages values
    data.total = getTotal(response);
    data.totalPages = getTotalPages(response);
  }

  // 3. At this point, data is ready to be consumed
  data.isReady = true;
};

export default tagHandler;
