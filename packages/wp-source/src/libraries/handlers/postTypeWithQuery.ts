import { Handler } from "../../../types";
import capitalize from "./utils/capitalize";
import { ServerError } from "@frontity/source";
import { fetch } from "frontity";

/**
 * The parameters for {@link postTypeHandler}.
 */
interface PostTypeHandlerParams {
  /**
   * The list of [WP REST API endpoints](https://developer.wordpress.org/rest-api/reference/)
   * from which the generated handler is going to fetch the data.
   */
  endpoints: string[];
}

/**
 * A {@link Handler} function generator for WordPress Post Types.
 *
 * This function will generate a handler function for specific
 * [WP REST API endpoints](https://developer.wordpress.org/rest-api/reference/)
 * from which the data is going to be fetched. The generated handler will fetch
 * data from all specified endpoints.
 *
 * @param options - Options for the handler generator: {@link PostTypeHandlerParams}.
 *
 * @example
 * ```js
 *   const postTypeHandlerFunc = postTypeHandler({ endpoints: ['post']});
 *   libraries.source.handlers.push({
 *     name: "post type",
 *     priority: 30,
 *     pattern: "/(.*)?/:slug",
 *     func: postTypeHandlerFunc,
 *   })
 * ```
 *
 * @returns An async "handler" function that can be passed as an argument to the handler object.
 * This function will be invoked by the frontity framework when calling `source.fetch()` for
 * a specific entity.
 */
const postTypeHandler = ({
  endpoints,
}: PostTypeHandlerParams): Handler => async ({
  link,
  params,
  state,
  libraries,
  force,
}) => {
  // 1. search id in state or get the entity from WP REST API
  const { query } = libraries.source.parse(link);
  const id = parseInt(params.id, 10);

  const finalTypes = ["post", "page"].concat(
    state.source.postTypes.map((postType) => postType.type)
  );

  let entity = finalTypes
    .reduce((all, type) => {
      all.push(...Object.values(state.source[type]));
      return all;
    }, [])
    .find((post) => post.id === id);

  if (!entity) {
    // 1.1 transform "posts" endpoint to state.source.postEndpoint
    const finalEndpoints = endpoints.map((endpoint) =>
      endpoint === "posts" ? state.source.postEndpoint : endpoint
    );

    // 1.2 iterate over finalEndpoints array
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

      // exit loop if this endpoint returns an entity!
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

    // 1.3 if no entity has found, throw an error
    if (!isHandled)
      throw new ServerError(
        `post type from endpoints "${endpoints}" with id "${id}" not found`,
        404
      );
  }

  // 2. get `type` and `id` from route data and assign props to data
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

export default postTypeHandler;
