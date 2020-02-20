import { Handler } from "../../../types";
import { ServerError } from "@frontity/source";

const authorHandler: Handler = async ({
  route,
  params,
  state,
  libraries,
  force
}) => {
  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { path, page, query } = parse(route);
  const { slug } = params;

  // Add the attributes that should be present even if fetch fails or we throw a ServerError below
  state.source.data[route] = {
    ...state.source.data[route],
    link: route,
    path,
    query,
    page
  };

  // 1. Search id in state or get it from WP REST API.
  let { id } = state.source.get(path);
  if (!id || force) {
    // Request author from WP
    const response = await api.get({ endpoint: "users", params: { slug } });
    const [entity] = await populate({ response, state, force: true });
    if (!entity)
      throw new ServerError(
        `entity from endpoint "users" with slug "${slug}" not found`,
        404
      );
    id = entity.id;
  }

  // 2. Fetch the specified page.
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

  // 3. Populate response.
  const items = await populate({ response, state });
  if (page > 1 && items.length === 0)
    throw new ServerError(`author "${slug}" doesn't have page ${page}`, 404);

  // 4. Get posts and pages count.
  const total = getTotal(response, items.length);
  const totalPages = getTotalPages(response, 0);

  // 5. Add data to source..
  const currentPageData = state.source.data[route];
  const firstPageData = state.source.data[path];

  Object.assign(currentPageData, {
    id: firstPageData.id,
    items,
    total,
    totalPages,
    isArchive: true,
    isAuthor: true
  });

  // 6. If it's a search, add the information.
  if (query.s) {
    currentPageData.isSearch = true;
    currentPageData.searchQuery = query.s;
  }
};

export default authorHandler;
