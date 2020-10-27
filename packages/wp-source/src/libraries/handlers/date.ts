import { Handler } from "../../../types";
import { ServerError } from "@frontity/source";
import { DateData, SearchData } from "@frontity/source/types/data";
import validateDate from "./utils/validateDate";

/**
 * A {@link Handler} for fetching posts by date.
 *
 * @param params - Defined in {@link Handler}.
 *
 * @example
 * ```js
 *   libraries.source.handlers.push({
 *     name: "date",
 *     priority: 20,
 *     pattern: "/:year(\\d+)/:month(\\d+)?/:day(\\d+)?",
 *     func: dateHandler,
 *   })
 * ```
 *
 * @returns A Promise that will resolve once the data for the posts has loaded.
 */
export const dateHandler: Handler = async ({
  link: linkArg,
  route: routeArg,
  params,
  state,
  libraries,
  force,
}) => {
  // This is only for backward compatibility for the moment when handlers used
  // to receive `route` instead of `link`.
  const link = linkArg || routeArg;

  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { route, page, query } = parse(link);

  // 1. build date properties
  // year has to be parsed correctly because it HAD TO be matched by a pattern.
  const year = parseInt(params.year);
  // it's okay if month is undefined, this will return NaN in that case.
  const month = params.month && parseInt(params.month);
  // it's okay if month is undefined, this will return NaN in that case.
  const day = params.day && parseInt(params.day);

  validateDate(year, month, day);

  const after = new Date(
    `${params.year}-${params.month || "01"}-${params.day || "01"}`
  );
  const before = new Date(after);

  if (!month) before.setUTCFullYear(year + 1);
  else if (!day) before.setUTCMonth(month);
  else before.setUTCDate(day + 1);

  // 2. fetch the specified page
  const response = await api.get({
    endpoint: state.source.postEndpoint,
    params: {
      _embed: true,
      after: after.toISOString(),
      before: before.toISOString(),
      search: query.s,
      page,
      ...state.source.params,
    },
  });

  // 3. populate response
  const items = await populate({ response, state, force });
  if (items.length === 0)
    throw new ServerError(`date "${route}" doesn't have page ${page}`, 404);

  // 4. get posts and pages count
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
   * @returns The full link for a particular page.
   * @example `getPageLink(1)`
   */
  const getPageLink = (page: number) =>
    libraries.source.stringify({ route, query, page });

  // 5. add data to source
  const currentPageData = state.source.data[link];

  const newPageData = {
    year,
    items,
    total,
    totalPages,
    isArchive: true,
    isDate: true,
    isFetching: currentPageData.isFetching,
    isReady: currentPageData.isReady,

    // Add next and previous if they exist.
    ...(hasOlderPosts && { previous: getPageLink(page - 1) }),
    ...(hasNewerPosts && { next: getPageLink(page + 1) }),

    // Add day and month only if they exist.
    ...(day && { day }),
    ...(month && { month }),

    // Add search data if this is a search.
    ...(query.s && { isSearch: true, searchQuery: query.s }),
  };

  Object.assign(currentPageData, newPageData) as
    | DateData
    | (DateData & SearchData);
};

export default dateHandler;
