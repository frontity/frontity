import { Handler } from "../../../types";
import getIdBySlug from "./utils/get-id-by-slug";

const authorHandler: Handler = async ({ route, params, state, libraries }) => {
  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { page, query } = parse(route);

  // 1. search id in state or get it from WP REST API
  const { slug } = params;
  let id = getIdBySlug(state.source.author, slug);
  if (!id) {
    // Request author from WP
    const response = await api.get({ endpoint: "users", params: { slug } });
    const [entity] = await populate({ response, state });
    if (!entity)
      throw new Error(
        `entity from endpoint 'users' with slug '${slug}' not found`
      );
    id = entity.id;
    // Populate author
  }

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

  // 3. populate response and add page to data
  const items = await populate({ response, state });
  if (page > 1 && items.length === 0)
    throw new Error(`author "${slug}" doesn't have page ${page}`);

  // 4. get posts and pages count
  const total = getTotal(response);
  const totalPages = getTotalPages(response);

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
