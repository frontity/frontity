import { Handler, PostArchiveData } from "../../types";
import { populate, getTotal, getTotalPages } from "../helpers";

const postArchiveHandler: Handler = async (ctx, { name, params, page = 1 }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  // 0. Get data from store
  let data = state.data(name);

  // 1. init data if it isn't already
  if (!data.isPostArchive) {
     // Init data
    data = {
      type: "post",
      pages: [],
      isArchive: true,
      isPostTypeArchive: true,
      isPostArchive: true,
      isHome: true,
      isFetching: true,
    };
  }
  
  if (!data.pages[page - 1]) {
    const response = await effects.api.get({
      endpoint: "posts",
      params: { search: params.s, page, _embed: true }
    });
    // populate response and add page to data
    data.pages[page - 1] = await populate(ctx, response);
    // and assign total and totalPages values
    data.total = getTotal(response);
    data.totalPages = getTotalPages(response);
  }
};

export default postArchiveHandler;
