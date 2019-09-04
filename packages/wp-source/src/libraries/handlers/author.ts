import { Handler } from "../../../types";
import getIdBySlug from "./utils/get-id-by-slug";

const authorHandler: Handler = async ({ route, params, state, libraries }) => {
  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { page, query } = parse(route);

  // 1. search id in state or get it from WP REST API
  const { slug } = params;
  const id =
    getIdBySlug(state.source.author, slug) ||
    (await api.getIdBySlug("users", slug));

  // 2. fetch the specified page
  const response = await api.get({
    endpoint: state.source.postEndpoint,
    params: {
      author: id,
      search: query.s,
      page,
      _embed: true,
      ...state.source.params
    }
  });

  // 3. throw an error if page is out of range
  const total = getTotal(response);
  const totalPages = getTotalPages(response);
  if (page > totalPages) throw new Error("Page doesn't exist.");

  // 4. populate response and add page to data
  const items = await populate({ response, state });

  // 5. add data to source
  Object.assign(state.source.data[route], {
    id,
    items,
    total,
    totalPages,
    isArchive: true,
    isAuthor: true
  });
};

export default authorHandler;
