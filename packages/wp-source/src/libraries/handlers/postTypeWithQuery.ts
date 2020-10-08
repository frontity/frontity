import { Handler } from "../../../types";
import capitalize from "./utils/capitalize";

/**
 * The parameters for {@link postTypeWithQueryHandler}.
 */
interface PostTypeWithQueryHandlerOptions {
  /**
   * The type of entities that are going to be fetched.
   */
  type: string;

  /**
   * A [WP REST API
   * endpoint](https://developer.wordpress.org/rest-api/reference/) from which
   * the generated handler is going to fetch the data.
   */
  endpoint: string;

  /**
   * Name of the query parameter where the ID is stored. Default is `p`.
   */
  idParamName?: string;
}

/**
 * A {@link Handler} function generator for WordPress Post Types.
 *
 * This function will generate a handler function for a specific [WP REST API
 * endpoint](https://developer.wordpress.org/rest-api/reference/) from which the
 * data is going to be fetched.
 *
 * The generated function is intended to be used with handlers for fetching post
 * type entities using plain permalinks (e.g. Http://frontity.site/?page_id=42).
 *
 * @param options - Options for the handler generator: {@link
 * PostTypeWithQueryHandlerOptions}.
 *
 * @example
 * ```js
 * const postWithQuery = postTypeWithQueryHandler({ endpoint: "posts" });
 * libraries.source.handlers.push({
 *   name: "post with query permalink",
 *   priority: 10,
 *   pattern: "RegExp:(\\?|&)p=\\d+",
 *   func: postWithQuery,
 * });
 * ```
 *
 * @example
 * ```js
 * const pageWithQuery = postTypeWithQueryHandler({
 *   endpoint: "pages",
 *   idParamName: "page_id"
 * });
 * libraries.source.handlers.push({
 *   name: "page with query permalink",
 *   priority: 10,
 *   pattern: "RegExp:(\\?|&)page_id=\\d+",
 *   func: pageWithQuery,
 * });
 * ```
 *
 * @returns An async "handler" function that can be passed as an argument to the
 * handler object. This function will be invoked by the frontity framework when
 * calling `actions.source.fetch()` for a specific entity.
 */
const postTypeWithQueryHandler = ({
  type,
  endpoint,
  idParamName = "p",
}: PostTypeWithQueryHandlerOptions): Handler => async ({
  link,
  state,
  libraries,
  force,
}) => {
  const { query } = libraries.source.parse(link);
  // Get the ID from the query.
  const id = parseInt(query[idParamName], 10);

  // Search for the entity in the state.
  const entity = state.source[type] && state.source[type][id];

  // If not found, fetch the entity. Also if force is `true`.
  if (!entity || force) {
    // Fetch the entity. The `api.get` call will throw a `ServerError` if the
    // request has failed.
    const response = await libraries.source.api.get({
      endpoint: `${endpoint}/${id}`,
      params: { _embed: true, ...state.source.params },
      auth: state.source.auth,
    });

    // Populate the entity. We can be sure here that the entity is being
    // populated because the previous call would have been thrown a
    // `ServerError` otherwise.
    await libraries.source.populate({ response, state, force });
  }

  // Assign props to data.
  const data = state.source.get(link);
  Object.assign(data, {
    type,
    link,
    query,
    id,
    isPostType: true,
    [`is${capitalize(type)}`]: true,
  });
};

export default postTypeWithQueryHandler;
