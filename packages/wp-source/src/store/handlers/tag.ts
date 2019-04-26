import { Handler } from "../../types";
import { getIdBySlug, populate, getTotal, getTotalPages } from "../helpers";

// CASES:
// 1. !data.isTag
// 2. !isPopulating && data.isTag && !data.pages[page - 1]

const tagHandler: Handler = async (
  ctx,
  { name, params, page = 1, isPopulating }
) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;
  
  // 0. Get data from store
  let data = state.data(name);

  // 1. init data if it isn't already
  if (!data.isTag) {
    // Search id in state of get it from WP REST API
    const taxonomy = "tag"
    const id = await getIdBySlug(ctx, "tag", params.slug);

    data = {
      taxonomy,
      id,
      pages: [],
      isArchive: true,
      isTaxonomy: true,
      isTag: true,
      isFetching: true,
    };
  }

  // 2. If data is a Tag, then all data is populated
  if (!isPopulating && data.isTag && !data.pages[page]) {
    // here we know the id!!
    const { id } = data;
    // and we don't need to init data
    // just get the page we are requesting
    const response = await effects.api.get({
      endpoint: "posts",
      params: { tags: id, search: params.s, page, _embed: true }
    });
    // populate response and add page to data
    data.pages[page] = await populate(ctx, response);
    // and assign total and totalPages values
    data.total = getTotal(response);
    data.totalPages = getTotalPages(response);
  }

  // 3. At this point, data is ready to be consumed
  data.isReady = true;
};

export default tagHandler;
