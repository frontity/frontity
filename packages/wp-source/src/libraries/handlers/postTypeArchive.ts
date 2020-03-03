import { Handler } from "../../../types";
import capitalize from "./utils/capitalize";
import { ServerError } from "@frontity/source";
import {
  PostTypeArchiveData,
  PostTypeArchiveWithSearchData
} from "@frontity/source/types/data";

const postTypeArchiveHandler = ({
  type,
  endpoint
}: {
  type: string;
  endpoint: string;
}): Handler => async ({ link, state, libraries }) => {
  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { page, query, route } = parse(link);

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
  const hasNewerPosts = page < totalPages;
  // returns true if previous page exists
  const hasOlderPosts = page > 1;

  const getPageLink = (page: number) =>
    libraries.source.stringify({
      route,
      query,
      page
    });

  // 4. add data to source
  const currentPageData = state.source.data[link];

  const newPageData: PostTypeArchiveData | PostTypeArchiveWithSearchData = {
    type,
    items,
    total,
    totalPages,
    isArchive: true,
    isPostTypeArchive: true,
    isFetching: currentPageData.isFetching,
    isReady: currentPageData.isReady,
    [`is${capitalize(type)}Archive`]: true,

    // Add next and previous if they exist.
    ...(hasOlderPosts && { previous: getPageLink(page - 1) }),
    ...(hasNewerPosts && { next: getPageLink(page + 1) }),

    // Add search data if this is a search.
    ...(query.s && { isSearch: true, searchQuery: query.s })
  };

  Object.assign(currentPageData, newPageData);
};

export default postTypeArchiveHandler;
