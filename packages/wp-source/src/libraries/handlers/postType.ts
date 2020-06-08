import { Handler } from "../../../types";
import capitalize from "./utils/capitalize";
import { ServerError } from "@frontity/source";

const postTypeHandler = ({
  endpoints,
}: {
  endpoints: string[];
}): Handler => async ({ link, params, state, libraries, force }) => {
  // 1. search id in state or get the entity from WP REST API
  const { route, query } = libraries.source.parse(link);
  if (!state.source.get(route).id) {
    const { slug } = params;

    // 1.1 transform "posts" endpoint to state.source.postEndpoint
    const finalEndpoints = endpoints.map((endpoint) =>
      endpoint === "posts" ? state.source.postEndpoint : endpoint
    );

    // 1.2 iterate over finalEndpoints array
    let isHandled = false;
    for (const endpoint of finalEndpoints) {
      const response = await libraries.source.api.get({
        endpoint,
        params: { slug, _embed: true, ...state.source.params },
      });

      const populated = await libraries.source.populate({
        response,
        state,
        force,
      });

      // exit loop if this endpoint returns an entity!
      if (populated.length > 0) {
        isHandled = true;
        break;
      }
    }

    // 1.3 if no entity has found, throw an error
    if (!isHandled)
      throw new ServerError(
        `post type from endpoints "${endpoints}" with slug "${slug}" not found`,
        404
      );
  }

  // 2. get `type` and `id` from route data and assign props to data
  const { type, id } = state.source.get(route);
  const data = state.source.get(link);
  Object.assign(data, {
    type,
    link: link,
    query,
    id,
    isPostType: true,
    [`is${capitalize(type)}`]: true,
  });
};

export default postTypeHandler;
