import { Handler } from "../../../types";
import capitalize from "./utils/capitalize";
import { ServerError } from "@frontity/source";
import { TermData, SearchData } from "@frontity/source/types/data";

/**
 * The parameters for {@link taxonomyHandler}.
 */
interface TaxonomyHandlerParams {
  /**
   * The slug of the custom taxonomy as configured in WordPress.
   *
   * @example "actor"
   */
  taxonomy: string;

  /**
   * The name of the [WordPress REST API
   * endpoint](https://developer.wordpress.org/rest-api/reference/) from which
   * the generated handler is going to fetch the taxonomy data.
   *
   * @example "actors"
   */
  endpoint: string;

  /**
   * The [WordPress REST API
   * endpoint](https://developer.wordpress.org/rest-api/reference/) of the
   * custom post type that should be fetched for this taxonomy.
   *
   * @example "movies"
   */
  postTypeEndpoint?: string;

  /**
   * The params that should be used in the REST API when fetching this taxonomy.
   */
  params?: Record<string, any>;
}

/**
 * A {@link Handler} function generator for WordPress Taxonomies.
 *
 * This function will generate a handler function for the specified parameters.
 *
 * @param options - Options for the handler generator:
 * {@link TaxonomyHandlerParams}.
 *
 * @example
 * ```js
 *   const tagHandler = taxonomyHandler({ taxonomy: "tag", endpoint: "tags" });
 *   libraries.source.handlers.push({
 *     name: "tag",
 *     priority: 20,
 *     pattern: "/tag/:slug"
 *     func: tagHandler,
 *   })
 * ```
 *
 * @returns An async "handler" function that can be passed as an argument to the
 * handler object. This function will be invoked by the frontity framework when
 * calling `source.fetch()` for a specific entity.
 */
const taxonomyHandler = ({
  taxonomy,
  endpoint,
  postTypeEndpoint,
  params: handlerParams = {},
}: TaxonomyHandlerParams): Handler => async ({
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
  let { id }: Partial<TermData> = state.source.get(route);
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

  // `libraries.source.populate()` creates a data object for each taxonomy it
  // receives from the Response object
  //
  // If state.source.data[route] doesn't contain the `taxonomy` property it
  // means that something else was returned from the endopoint and this handler
  // was matched erroneously.
  const data: Partial<TermData> = state.source.data[route];
  if (!data.taxonomy) {
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

  /**
   * A helper function that helps "glue" the link back together from `route`,
   * `query` and `page`.
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

  // 5. add data to source
  const currentPageData = state.source.data[link];
  const firstPageData: Partial<TermData> = state.source.data[route];

  const newPageData = {
    id: firstPageData.id,
    taxonomy: firstPageData.taxonomy,
    items,
    total,
    totalPages,
    isArchive: true,
    isTerm: true,
    isTaxonomy: true, // Added to maintaing backwards compatibility.
    [`is${capitalize(firstPageData.taxonomy)}`]: true,

    // Add next and previous if they exist.
    ...(hasOlderPosts && { previous: getPageLink(page - 1) }),
    ...(hasNewerPosts && { next: getPageLink(page + 1) }),

    // Add search data if this is a search.
    ...(query.s && { isSearch: true, searchQuery: query.s }),
  };

  Object.assign(currentPageData, newPageData) as
    | TermData
    | (TermData & SearchData);
};

export default taxonomyHandler;
