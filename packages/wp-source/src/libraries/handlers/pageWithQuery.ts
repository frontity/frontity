import { Handler } from "../../../types";
import capitalize from "./utils/capitalize";

/**
 * A {@link Handler} function for WordPress to fetch pages using plain
 * permalinks (for example, http://my.frontity.site/?page_id=123).
 *
 * If the `preview` and `token` query params are present, then that token is
 * used and the unpublished draft of that page is fetched.
 *
 * @example
 * ```js
 * libraries.source.handlers.push({
 *   name: "page - query permalink",
 *   priority: 10,
 *   pattern: "RegExp:(\\?|&)page_id=\\d+",
 *   func: pageWithQuery,
 * })
 * ```
 *
 * @param params - Defined in {@link Handler}.
 * @returns A Promise that will resolve once the data the fetch has done.
 */
const pageWithQueryHandler: Handler = async ({
  link,
  state,
  libraries,
  force,
}) => {
  const { query } = libraries.source.parse(link);
  const { preview, token } = query;

  // Get the page ID from the query.
  const id = parseInt(query.page_id, 10);

  // Search for the page entity in the state.
  let entity = state.source.page[id];

  // If not found, fetch the entity.
  if (!entity) {
    const request = {
      endpoint: `pages/${id}`,
      params: { _embed: true, ...state.source.params },
      auth: "",
    };

    // Use the token if present.
    if (preview && token) request.auth = `Bearer ${token}`;

    // Fetch and populate the page.
    // The `api.get` call will throw a `ServerError` if the request has failed.
    const response = await libraries.source.api.get(request);
    const [item] = await libraries.source.populate({
      response,
      state,
      force,
    });

    // We don't have to check if `item` exists or is correct because in that
    // case `api.get()` would have thrown a `ServerError`, and this line of code
    // would have not been reached.
    entity = state.source[item.type][item.id];
  }

  // Get `type` and `id` from entity and assign props to data.
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

export default pageWithQueryHandler;
