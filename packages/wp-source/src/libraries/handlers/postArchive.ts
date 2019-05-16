import { Handler } from "../../../";
import getTotal from "./utils/get-total";
import getTotalPages from "./utils/get-total-pages";

const postArchiveHandler: Handler = async (
  state,
  { path, params, page = 1, libraries }
) => {
  const { api, populate } = libraries.source;

  // 0. Get data from store
  let data = state.dataMap[path];

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
      isFetching: true
    };
  }

  if (!data.pages[page]) {
    const response = await api.get({
      endpoint: "posts",
      params: { search: params.s, page, _embed: true }
    });
    // populate response and add page to data
    data.pages[page] = await populate(state, response);
    // and assign total and totalPages values
    data.total = getTotal(response);
    data.totalPages = getTotalPages(response);
  }

  state.dataMap[path] = data;
};

export default postArchiveHandler;
