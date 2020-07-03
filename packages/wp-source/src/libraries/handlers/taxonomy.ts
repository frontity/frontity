import { Handler } from "../../../types";
import capitalize from "./utils/capitalize";
import { ServerError } from "@frontity/source";
import {
  TaxonomyData,
  TaxonomyWithSearchData,
} from "@frontity/source/types/data";

const taxonomyHandler = ({
  taxonomy,
  endpoint,
  postTypeEndpoint,
  params: handlerParams = {},
}: {
  taxonomy: string;
  endpoint: string;
  postTypeEndpoint?: string;
  params?: Record<string, any>;
}): Handler => async ({
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

  // 1. search id in state or get it from WP REST API
  let { id } = state.source.get(route);
  if (!id || force) {
    const { slug } = params;
    // Request entity from WP
    const response = await api.get({
      endpoint,
      params: {
        slug,
      },
    });
    const [entity] = await populate({
      response,
      state,
      force: true,
    });
    if (!entity)
      throw new ServerError(
        `entity from endpoint "${endpoint}" with slug "${slug}" not found`,
        404
      );
    id = entity.id;
  }

  // 2. fetch the specified page
  const response = await api.get({
    endpoint: postTypeEndpoint || state.source.postEndpoint,
    params: {
      [endpoint]: id,
      search: query.s,
      page,
      _embed: true,
      ...state.source.params,
      ...handlerParams,
    },
  });

  // 3. populate response
  const items = await populate({
    response,
    state,
  });
  if (page > 1 && items.length === 0)
    throw new ServerError(
      `${taxonomy} with slug "${params.slug}" doesn't have page ${page}`,
      404
    );

  if (!state.source.data[route].taxonomy) {
    throw new ServerError(
      `You have tried to access content at route: ${route} but it does not exist`,
      404
    );
  }

  // 4. get posts and pages count
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
      page,
    });

  // 5. add data to source
  const currentPageData = state.source.data[link];
  const firstPageData = state.source.data[route];

  const newPageData: TaxonomyData | TaxonomyWithSearchData = {
    id: firstPageData.id,
    taxonomy: firstPageData.taxonomy,
    items,
    total,
    totalPages,
    isArchive: true,
    isTaxonomy: true,
    isFetching: currentPageData.isFetching,
    isReady: currentPageData.isReady,
    [`is${capitalize(firstPageData.taxonomy)}`]: true,

    // Add next and previous if they exist.
    ...(hasOlderPosts && { previous: getPageLink(page - 1) }),
    ...(hasNewerPosts && { next: getPageLink(page + 1) }),

    // Add search data if this is a search.
    ...(query.s && { isSearch: true, searchQuery: query.s }),
  };

  Object.assign(currentPageData, newPageData);
};

export default taxonomyHandler;
