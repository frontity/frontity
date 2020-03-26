import { Handler } from "../../../types";
import { ServerError } from "@frontity/source";
import { DateData, DateWithSearchData } from "@frontity/source/types/data";

export const dateHandler: Handler = async ({
  link: linkArg,
  route: routeArg,
  params,
  state,
  libraries,
}) => {
  // This is only for backward compatibility for the moment when handlers used
  // to receive `route` instead of `link`.
  const link = linkArg || routeArg;

  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { route, page, query } = parse(link);

  // 1. build date properties
  const year = parseInt(params.year);
  const month = params.month && parseInt(params.month);
  const day = params.day && parseInt(params.day);

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
  const items = await populate({ response, state });
  if (items.length === 0)
    throw new ServerError(`date "${route}" doesn't have page ${page}`, 404);

  // 4. get posts and pages count
  const total = getTotal(response, items.length);
  const totalPages = getTotalPages(response, 0);

  // returns true if next page exists
  const hasNewerPosts = page < totalPages;
  // returns true if previous page exists
  const hasOlderPosts = page > 1;

  const getPageLink = (page: number) =>
    libraries.source.stringify({ route, query, page });

  // 5. add data to source
  const currentPageData = state.source.data[link];

  const newPageData: DateData | DateWithSearchData = {
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

  Object.assign(currentPageData, newPageData);
};

export default dateHandler;
