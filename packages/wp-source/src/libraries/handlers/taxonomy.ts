import { Handler } from "../../../types";
import capitalize from "./utils/capitalize";
import { ServerError } from "@frontity/source";

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
}): Handler => async ({ route, params, state, libraries, force }) => {
  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { path, page, query } = parse(route);

  // 1. search id in state or get it from WP REST API
  let { id } = state.source.get(path);
  if (!id || force) {
    const { slug } = params;
    // Request entity from WP
    const response = await api.get({ endpoint, params: { slug } });
    const [entity] = await populate({ response, state, force: true });
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
  const items = await populate({ response, state });
  if (page > 1 && items.length === 0)
    throw new ServerError(
      `${taxonomy} with slug "${params.slug}" doesn't have page ${page}`,
      404
    );

  // 4. get posts and pages count
  const total = getTotal(response, items.length);
  const totalPages = getTotalPages(response, 0);

  // 5. add data to source
  const currentPageData = state.source.data[route];
  const firstPageData = state.source.data[path];

  Object.assign(currentPageData, {
    link: route,
    id: firstPageData.id,
    taxonomy: firstPageData.taxonomy,
    items,
    total,
    totalPages,
    isArchive: true,
    isTaxonomy: true,
    [`is${capitalize(firstPageData.taxonomy)}`]: true
  });

  // 6. If it's a search, add the information.
  if (query.s) {
    currentPageData.isSearch = true;
    if (currentPageData.isSearch) {
      currentPageData.searchQuery = query.s;
    }
  }
};

export default taxonomyHandler;
