import { Handler } from "../../../types";
import capitalize from "./utils/capitalize";

const postTypeHandler = ({
  endpoints
}: {
  endpoints: string[];
}): Handler => async ({ route, params, state, libraries }) => {
  // 1. search id in state or get the entity from WP REST API
  if (!state.source.get(route).id) {
    const { slug } = params;

    // 1.1 transform "posts" endpoint to state.source.postEndpoint
    const finalEndpoints = endpoints.map(endpoint =>
      endpoint === "posts" ? state.source.postEndpoint : endpoint
    );

    // 1.2 iterate over finalEndpoints array
    let isHandled = false;
    for (const endpoint of finalEndpoints) {
      const response = await libraries.source.api.get({
        endpoint,
        params: { slug, _embed: true, ...state.source.params }
      });

      const populated = await libraries.source.populate({ response, state });

      // exit loop if this endpoint returns an entity!
      if (populated.length > 0) {
        isHandled = true;
        break;
      }
    }

    // 1.3 if no entity has found, throw an error
    if (!isHandled)
      throw new Error(
        `post type from endpoints "${endpoints}" with slug "${slug}" not found`
      );
  }

  // 2. add data to source
  const data = state.source.get(route);
  Object.assign(data, {
    isPostType: true,
    [`is${capitalize(data.type)}`]: true
  });
};

export default postTypeHandler;
