import { Handler } from "../../../types";
import capitalize from "./utils/capitalize";
import { ServerError } from "@frontity/source";
import { PostTypeArchiveData } from "@frontity/source/types/data";

const postTypeArchiveHandler = ({
  type,
  endpoint
}: {
  type: string;
  endpoint: string;
}): Handler => async ({ route, state, libraries }) => {
  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { page, query, path } = parse(route);

  // 1. fetch the specified page
  const response = await api.get({
    endpoint: endpoint === "posts" ? state.source.postEndpoint : endpoint,
    params: {
      search: query.s,
      page,
      _embed: true,
      ...state.source.params
    }
  });

  // 2. populate response
  const items = await populate({
    response,
    state
  });
  if (page > 1 && items.length === 0)
    throw new ServerError(`post archive doesn't have page ${page}`, 404);

  // 3. get posts and pages count
  const total = getTotal(response, items.length);
  const totalPages = getTotalPages(response, 0);

  // returns true if next page exists
  const hasOlderPosts = page < totalPages;
  // returns true if previous page exists
  const hasNewerPosts = page > 1;

  const getPageLink = (page: number) =>
    libraries.source.stringify({
      path,
      query,
      page
    });

  // 4. add data to source
  const currentPageData = state.source.data[route];

  const newPageData: PostTypeArchiveData = {
    type,
    items,
    total,
    totalPages,
    isArchive: true,
    isPostTypeArchive: true,
    isFetching: currentPageData.isFetching,
    isReady: currentPageData.isReady,
    [`is${capitalize(type)}Archive`]: true,

    // Add those keys if hasOlderPosts / hasNewerPosts === true
    ...(hasOlderPosts && { prev: getPageLink(page - 1) }),
    ...(hasNewerPosts && { next: getPageLink(page + 1) })
  };

  Object.assign(currentPageData, newPageData);

  // 6. If it's a search, add the information.
  if (query.s) {
    currentPageData.isSearch = true;
    if (currentPageData.isSearch) {
      currentPageData.searchQuery = query.s;
    }
  }
};

export default postTypeArchiveHandler;
