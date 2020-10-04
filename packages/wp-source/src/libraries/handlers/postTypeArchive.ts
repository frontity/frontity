import { Handler } from "../../../types";
import capitalize from "./utils/capitalize";
import { ServerError } from "@frontity/source";
import {
  PostTypeArchiveData,
  PostTypeArchiveWithSearchData,
} from "@frontity/source/types/data";

/**
 * The parameters for {@link postTypeArchiveHandler}.
 */
interface PostTypeArchiveHandlerParams {
  /**
   * The slug of the custom post type as configured in WordPress.
   *
   * @example "movie"
   */
  type: string;

  /**
   * The [WP REST API endpoint](https://developer.wordpress.org/rest-api/reference/)
   * from which the generated handler is going to fetch the data.
   *
   * @example "movies"
   */
  endpoint: string;
}

/**
 * A {@link Handler} function generator for WordPress Post Type archives.
 *
 * This function will generate a handler function for a specific [WP REST API
 * endpoint](https://developer.wordpress.org/rest-api/reference/) from which the
 * data is going to be fetched.
 *
 * @param options - Options for the handler generator:
 * {@link PostTypeArchiveHandlerParams}.
 *
 * @example
 * ```js
 *   const postTypeArchiveHandlerFunc = postTypeHandler({
 *     type: "movie",
 *     endpoint: "movies",
 *   });
 *   libraries.source.handlers.push({
 *     name: "movies archive",
 *     priority: 30,
 *     pattern: "/movies/",
 *     func: postTypeArchiveHandlerFunc,
 *   })
 * ```
 *
 * @returns An async "handler" function that can be passed as an argument to the
 * handler object. This function will be invoked by the frontity framework when
 * calling `source.fetch()` for a specific entity.
 */
const postTypeArchiveHandler = ({
  type,
  endpoint,
}: PostTypeArchiveHandlerParams): Handler => async ({
  link: linkArg,
  route: routeArg,
  state,
  libraries,
  force,
}) => {
  // This is only for backward compatibility for the moment when handlers used
  // to receive `route` instead of `link`.
  const link = linkArg || routeArg;
  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { page, query, route } = parse(link);

  // 1. fetch the specified page
  const response = await api.get({
    endpoint: endpoint === "posts" ? state.source.postEndpoint : endpoint,
    params: {
      search: query.s,
      page,
      _embed: true,
      ...state.source.params,
    },
  });

  // 2. populate response
  const items = await populate({
    response,
    state,
    force,
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

  /**
   * A helper function that helps "glue" the link back together
   * from `route`, `query` and `page`.
   *
   * @param page - The page number.
   *
   * @returns The full link for a particular page.
   */
  const getPageLink = (page: number) =>
    libraries.source.stringify({
      route,
      query,
      page,
    });

  // 4. add data to source
  const currentPageData = state.source.data[link];

  const newPageData = {
    type,
    items,
    total,
    totalPages,
    isArchive: true,
    isPostTypeArchive: true,
    [`is${capitalize(type)}Archive`]: true,

    // Add next and previous if they exist.
    ...(hasOlderPosts && { previous: getPageLink(page - 1) }),
    ...(hasNewerPosts && { next: getPageLink(page + 1) }),

    // Add search data if this is a search.
    ...(query.s && { isSearch: true, searchQuery: query.s }),
  };

  // This ensures the resulting type is correct.
  Object.assign(currentPageData, newPageData) as
    | PostTypeArchiveData
    | PostTypeArchiveWithSearchData;
};

export default postTypeArchiveHandler;
