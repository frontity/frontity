import { Handler } from "../../types";
import getIdBySlug from "./utils/get-id-by-slug";
import getTotal from "./utils/get-total";
import getTotalPages from "./utils/get-total-pages";

const authorHandler: Handler = async (
  state,
  { path, params, page = 1, libraries }
) => {
  const { api, populate } = libraries.source;

  // 0. Get data from store
  let data = state.dataMap[path];

  // 1. init data if it isn't already
  if (!data.isAuthor) {
    // Search id in state or get it from WP REST API
    const { slug } = params;
    const id =
      getIdBySlug(state.author, slug) || (await api.getIdBySlug("users", slug));

    data = {
      id,
      pages: [],
      isArchive: true,
      isAuthor: true,
      isFetching: true
    };

    state.dataMap[path] = data;
  }

  // 2. fetch the specified page if necessary
  if (!data.pages[page - 1]) {
    // here we know the id!!
    const { id } = data;
    // and we don't need to init data
    // just get the page we are requesting
    const response = await api.get({
      endpoint: "posts",
      params: { author: id, search: params.s, page, _embed: true }
    });
    // populate response and add page to data
    data.pages[page - 1] = await populate(state, response);
    // and assign total and totalPages values
    data.total = getTotal(response);
    data.totalPages = getTotalPages(response);
  }
};

export default authorHandler;
