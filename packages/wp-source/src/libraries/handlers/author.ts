import { Handler } from "../../../types";
import { ServerError } from "@frontity/source";
import { AuthorData, AuthorWithSearchData } from "@frontity/source/types/data";

const authorHandler: Handler = async ({
  link: linkArg,
  route: routeArg,
  params,
  state,
  libraries,
  force
}) => {
  // This is only for backward compatibility for the moment when handlers used
  // to receive `route` instead of `link`.
  const link = linkArg || routeArg;

  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { route, page, query } = parse(link);
  const { slug } = params;

  // 1. Search id in state or get it from WP REST API.
  let { id } = state.source.get(route);
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
  const totalPages = getTotalPages(response, 1);

  // returns true if next page exists
  const hasNewerPosts = page < totalPages;
  // returns true if previous page exists
  const hasOlderPosts = page > 1;

  const getPageLink = (page: number) =>
    libraries.source.stringify({ route, query, page });

  // 5. Add data to source..
  const currentPageData = state.source.data[link];
  const firstPageData = state.source.data[route];

  const newPageData: AuthorData | AuthorWithSearchData = {
    id: firstPageData.id,
    items,
    total,
    totalPages,
    isArchive: true,
    isAuthor: true,
    isReady: currentPageData.isReady,
    isFetching: currentPageData.isFetching,

    // Add next and previous if they exist.
    ...(hasOlderPosts && { previous: getPageLink(page - 1) }),
    ...(hasNewerPosts && { next: getPageLink(page + 1) }),

    // Add search data if this is a search.
    ...(query.s && { isSearch: true, searchQuery: query.s })
  };

  Object.assign(currentPageData, newPageData);
};

export default authorHandler;
