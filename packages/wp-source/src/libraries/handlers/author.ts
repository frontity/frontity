import { Handler } from "../../../types";

const authorHandler: Handler = async ({ route, params, state, libraries }) => {
  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { path, page, query } = parse(route);
  const { slug } = params;

  // 1. search id in state or get it from WP REST API
  let { id } = state.source.get(path);
  if (!id) {
    // Request author from WP
    const response = await api.get({ endpoint: "users", params: { slug } });
    const [entity] = await populate({ response, state });
    if (!entity)
      throw new Error(
        `entity from endpoint "users" with slug "${slug}" not found`
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
  Object.assign(state.source.data[route], state.source.data[path], {
    items,
    total,
    totalPages,
    isArchive: true,
    isAuthor: true
  });
};

export default authorHandler;
