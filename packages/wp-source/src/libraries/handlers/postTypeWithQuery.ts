import { Handler } from "../../../types";
import capitalize from "./utils/capitalize";
import { ServerError } from "@frontity/source";

/**
 * The parameters for {@link postTypeWithQueryHandler}.
 */
interface PostTypeWithQueryHandlerOptions {
  /**
   * The list of [WP REST API
   * endpoints](https://developer.wordpress.org/rest-api/reference/) from which
   * the generated handler is going to fetch the data.
   */
  endpoints: string[];
}

/**
 * A {@link Handler} function generator for WordPress Post Types.
 *
 * This function will generate a handler function for specific [WP REST API
 * endpoints](https://developer.wordpress.org/rest-api/reference/) from which
 * the data is going to be fetched. The generated handler will fetch data from
 * all specified endpoints.
 *
 * @param options - Options for the handler generator: {@link
 * PostTypeWithQueryHandlerOptions}.
 *
 * @example
 * ```js
 * const postTypeWithQuery = postTypeWithQueryHandler({
 *   endpoints: ["post", "page"],
 * });
 * libraries.source.handlers.push({
 *   name: "post type - query permalink",
 *   priority: 10,
 *   pattern: "RegExp:(\\?|&)p=\\d+",
 *   func: postTypeWithQuery,
 * });
 * ```
 *
 * @returns An async "handler" function that can be passed as an argument to
 * the handler object. This function will be invoked by the frontity framework
 * when calling `actions.source.fetch()` for a specific entity.
 */
const postTypeWithQueryHandler = ({
  endpoints,
}: PostTypeWithQueryHandlerOptions): Handler => async ({
  link,
  state,
  libraries,
  force,
}) => {
  const { query } = libraries.source.parse(link);
  const { preview, token } = query;

  // Get the post ID from the query.
  const id = parseInt(query.p, 10);

  const finalTypes = ["post"].concat(
    state.source.postTypes.map((postType) => postType.type)
  );

  // Search for an entity with the given ID in every post type.
  let entity = finalTypes
    .map((type) => state.source[type] && state.source[type][id])
    .find((post) => post);

  if (!entity) {
    // Transform "posts" endpoint to state.source.postEndpoint.
    const finalEndpoints = endpoints.map((endpoint) =>
      endpoint === "posts" ? state.source.postEndpoint : endpoint
    );

    // No endpoint has returned the desired entity yet.
    let isFound = false;

    // Iterate over finalEndpoints array.
    for (const endpoint of finalEndpoints) {
      const request = {
        endpoint: `${endpoint}/${id}`,
        params: { _embed: true, ...state.source.params },
        auth: "",
      };

      // Use the token if present.
      if (preview && token) request.auth = `Bearer ${token}`;

      // Try getting an entity from `endpoint` with the given ID.
      let response: Response;
      try {
        response = await libraries.source.api.get(request);
      } catch (e) {
        // The `api.get` request has failed!
        // Jump to the next iteration step.
        continue;
      }

      // The `api.get` request has succeed.
      isFound = true;

      // Populate response.
      const [item] = await libraries.source.populate({
        response,
        state,
        force,
      });

      // Get populated entity. `item` should be fine at this point.
      entity = state.source[item.type][item.id];

      // Get out of the loop.
      break;
    }

    // If no entity has found, throw an error.
    if (!isFound)
      throw new ServerError(
        `post type from endpoints "${endpoints}" with id "${id}" not found`,
        404
      );
  }

  // Get `type` and `id` from route data and assign props to data.
  const data = state.source.get(link);
  Object.assign(data, {
    type: entity.type,
    link,
    query,
    id,
    isPostType: true,
    [`is${capitalize(entity.type)}`]: true,
  });
};

export default postTypeWithQueryHandler;
