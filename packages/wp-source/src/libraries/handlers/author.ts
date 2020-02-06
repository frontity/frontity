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

  // 1. search id in state or get it from WP REST API
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

  // 3. populate response
  const items = await populate({ response, state });
  if (page > 1 && items.length === 0)
    throw new ServerError(`author "${slug}" doesn't have page ${page}`, 404);

  // 4. get posts and pages count
  const total = getTotal(response);
  const totalPages = getTotalPages(response);

  // 5. add data to source
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
};

export default authorHandler;
