import { Handler } from "../../../";
import getIdBySlug from "./utils/get-id-by-slug";
import getTotal from "./utils/get-total";
import getTotalPages from "./utils/get-total-pages";

const authorHandler: Handler = async (source, { route, params, libraries }) => {
  const { api, populate, getParams } = libraries.source;
  const { page, query } = getParams(route);

  // 1. search id in state or get it from WP REST API
  const { slug } = params;
  const id =
    getIdBySlug(source.author, slug) || (await api.getIdBySlug("users", slug));

  // 2. fetch the specified page
  const response = await api.get({
    endpoint: "posts",
    params: { author: id, search: query.s, page, _embed: true }
  });

  // 3. throw an error if page is out of range
  const total = getTotal(response);
  const totalPages = getTotalPages(response);
  if (page > totalPages) throw new Error("Page doesn't exist.");

  // 4. populate response and add page to data
  const items = await populate(source, response);

  // 5. add data to source
  source.data[route] = {
    id,
    items,
    total,
    totalPages,
    isArchive: true,
    isAuthor: true,
    isFetching: true
  };
};

export default authorHandler;
