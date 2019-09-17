import { Handler } from "../../../types";
import capitalize from "./utils/capitalize";

export default ({ endpoints }: { endpoints: string[] }): Handler => async ({
  route,
  params,
  state,
  libraries
}) => {
  // Get post from REST API if not found
  if (!state.source.get(route).id) {
    const { slug } = params;
    const finalEndpoints = endpoints.map(endpoint =>
      endpoint === "posts" ? state.source.postEndpoint : endpoint
    );

    let isHandled = false;
    for (const endpoint of finalEndpoints) {
      const response = await libraries.source.api.get({
        endpoint,
        params: { slug, _embed: true, ...state.source.params }
      });

      const populated = await libraries.source.populate({ response, state });

      if (populated.length > 0) {
        isHandled = true;
        break;
      }
    }

    if (!isHandled)
      throw new Error(
        `post type from endpoints "${endpoints}" with slug "${slug}" not found`
      );
  }

  // Get data again
  const data = state.source.get(route);
  Object.assign(data, {
    isPostType: true,
    [`is${capitalize(data.type)}`]: true
  });
};
