import { Handler } from "../../../types";
import { ServerError } from "@frontity/source";
import { DateData } from "@frontity/source/types/data";

export const dateHandler: Handler = async ({
  route,
  params,
  state,
  libraries
}) => {
  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { path, page, query } = parse(route);

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
      ...state.source.params
    }
  });

  // 3. populate response
  const items = await populate({ response, state });
  if (items.length === 0)
    throw new ServerError(`date "${path}" doesn't have page ${page}`, 404);

  // 4. get posts and pages count
  const total = getTotal(response, items.length);
  const totalPages = getTotalPages(response, 0);

  // returns true if next page exists
  const hasOlderPosts = page < totalPages;
  // returns true if previous page exists
  const hasNewerPosts = page > 1;

  const getPageLink = (page: number) =>
    libraries.source.stringify({ path, query, page });

  // 5. add data to source
  const currentPageData = state.source.data[route];

  const newPageData: DateData = {
    year,
    month,
    day,
    items,
    total,
    totalPages,
    isArchive: true,
    isDate: true,
    isFetching: currentPageData.isFetching,
    isReady: currentPageData.isReady,

    // Add those keys if hasOlderPosts / hasNewerPosts === true
    ...{ prev: hasOlderPosts && getPageLink(page - 1) },
    ...{ next: hasNewerPosts && getPageLink(page + 1) }
  };

  Object.assign(currentPageData, newPageData);

  // 6. If it's a search, add the information.
  if (query.s) {
    currentPageData.isSearch = true;
    currentPageData.searchQuery = query.s;
  }
};

export default dateHandler;
