import { Handler } from "../../../types";
import capitalize from "./utils/capitalize";
import { ServerError } from "@frontity/source";
import { fetch } from "frontity";

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
  // Search for the entity in the state.
  const { query } = libraries.source.parse(link);
  const id = parseInt(query.p, 10);

  const finalTypes = ["post", "page"].concat(
    state.source.postTypes.map((postType) => postType.type)
  );

  //
  let entity = finalTypes
    .reduce((all, type) => {
      all.push(...Object.values(state.source[type]));
      return all;
    }, [])
    .find((post) => post.id === id);

  if (!entity) {
    // Transform "posts" endpoint to state.source.postEndpoint.
    const finalEndpoints = endpoints.map((endpoint) =>
      endpoint === "posts" ? state.source.postEndpoint : endpoint
    );

    // Iterate over finalEndpoints array.
    let isHandled = false;
    let isMismatched = false;
    for (const endpoint of finalEndpoints) {
      const response = await libraries.source.api.get({
        endpoint,
        params: { include: id, _embed: true, ...state.source.params },
      });

      const populated = await libraries.source.populate({
        response,
        state,
        force,
      });

      // Exit loop if this endpoint returns an entity.
      if (populated.length > 0) {
        // We have to check if the link property in the data that we
        // populated is the same as the current route.
        if (populated[0].id === id) {
          isHandled = true;
          isMismatched = false;
          entity = populated[0];
          break;
        } else {
          isMismatched = true;
        }
      }
    }

    if (isMismatched) {
      throw new ServerError(
        `You have tried to access content at link: ${link} but it does not exist`,
        404
      );
    }

    // If no entity has found, throw an error.
    if (!isHandled)
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

  // Overwrite properties if the request is a preview.
  const { preview, token } = query;
  if (preview && token) {
    // Fetch the latest revision using the token.
    const response = await fetch(
      `${state.source.api}/wp/v2/posts/${id}/revisions?per_page=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Get modified props from revision.
    const [json] = await response.json();

    if (json.parent === id) {
      const { title, content, excerpt } = json;
      // Merge props with entity.
      Object.assign(entity, { title, content, excerpt });
    } else {
      // Error response.
      console.warn(json);
    }
  }
};

export default postTypeWithQueryHandler;
