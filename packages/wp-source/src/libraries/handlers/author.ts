import { Handler } from "../../../types";
import { ServerError } from "@frontity/source";
import { DateData, AuthorData } from "@frontity/source/types/data";

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

  // 1. Search id in state or get it from WP REST API.
  let { id } = state.source.get(path);
  if (!id || force) {
    // Request author from WP
    const response = await api.get({
      endpoint: "users",
      params: { slug }
    });
    const [entity] = await populate({
      response,
      state,
      force: true
    });
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

  // returns true if next page exists
  const hasOlderPosts = page < totalPages;
  // returns true if previous page exists
  const hasNewerPosts = page > 1;

  const getPageLink = (page: number) =>
    libraries.source.stringify({ path, query, page });

  // 5. Add data to source..
  const currentPageData = state.source.data[route];
  const firstPageData = state.source.data[path];

  const newPageData: AuthorData = {
    id: firstPageData.id,
    items,
    total,
    totalPages,
    isArchive: true,
    isAuthor: true,
    isReady: currentPageData.isReady,
    isFetching: currentPageData.isFetching,

    // Add those keys if hasOlderPosts / hasNewerPosts === true
    ...(hasOlderPosts && { prev: getPageLink(page - 1) }),
    ...(hasNewerPosts && { next: getPageLink(page + 1) })
  };

  Object.assign(currentPageData, newPageData);

  // 6. If it's a search, add the information.
  if (query.s) {
    currentPageData.isSearch = true;
    currentPageData.searchQuery = query.s;
  }
};

export default authorHandler;
