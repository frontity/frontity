import { Handler } from "../../types";
import { getIdBySlug, getTotal, getTotalPages } from "../helpers";

const tagHandler: Handler = async (ctx, { path, params, page = 1 }) => {
  const state = ctx.state.source;
  const { api, populate } = ctx.effects.source;

  // 0. Get data from store
  let data = state.dataMap[path];

  // 1. init data if it isn't already
  if (!data.isTag) {
    // Search id in state of get it from WP REST API
    const { slug } = params;
    const id =
      getIdBySlug(state.tag, slug) || (await api.getIdBySlug("tags", slug));

    data = {
      id,
      taxonomy: "tag",
      pages: [],
      isArchive: true,
      isTaxonomy: true,
      isTag: true,
      isFetching: true
    };

    state.dataMap[path] = data;
  }

  // 2. fetch the specified page if necessary
  if (!data.pages[page]) {
    // here we know the id!!
    const { id } = data;
    // and we don't need to init data
    // just get the page we are requesting
    const response = await api.get({
      endpoint: "posts",
      params: { tags: id, search: params.s, page, _embed: true }
    });
    // populate response and add page to data
    data.pages[page] = await populate(state, response);
    // and assign total and totalPages values
    data.total = getTotal(response);
    data.totalPages = getTotalPages(response);
  }
};

export default tagHandler;
