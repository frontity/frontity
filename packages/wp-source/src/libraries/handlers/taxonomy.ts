import { Handler } from "../../../types";
import capitalize from "./utils/capitalize";
import { ServerError } from "@frontity/source";
import { TaxonomyData } from "@frontity/source/types/data";

const taxonomyHandler = ({
  taxonomy,
  endpoint,
  postTypeEndpoint,
  params: handlerParams = {}
}: {
  taxonomy: string;
  endpoint: string;
  postTypeEndpoint?: string;
  params?: Record<string, any>;
}): Handler => async ({ link, params, state, libraries, force }) => {
  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { path, page, query } = parse(link);

  // 1. search id in state or get it from WP REST API
  let { id } = state.source.get(path);
  if (!id || force) {
    const { slug } = params;
    // Request entity from WP
    const response = await api.get({
      endpoint,
      params: {
        slug
      }
    });
    const [entity] = await populate({
      response,
      state,
      force: true
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
      ...handlerParams
    }
  });

  // 3. populate response
  const items = await populate({
    response,
    state
  });
  if (page > 1 && items.length === 0)
    throw new ServerError(
      `${taxonomy} with slug "${params.slug}" doesn't have page ${page}`,
      404
    );

  // 4. get posts and pages count
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

  // 5. add data to source
  const currentPageData = state.source.data[link];
  const firstPageData = state.source.data[path];

  const newPageData: TaxonomyData = {
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

    // Add those keys if hasOlderPosts / hasNewerPosts === true
    ...(hasOlderPosts && { previous: getPageLink(page - 1) }),
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

export default taxonomyHandler;
