import { Handler } from "../../..";
import getIdBySlug from "./utils/get-id-by-slug";

const postTypeHandler = ({
  type,
  endpoint,
  truths = {}
}: {
  type: string;
  endpoint: string;
  truths?: Record<string, true>;
}): Handler => async ({ route, params, state, libraries }) => {
  const { source } = state;
  const { api, populate } = libraries.source;

  const { slug } = params;
  let id = getIdBySlug(source[type], slug);

  // Get post type from REST API if not found
  if (!id) {
    const response = await api.get({
      endpoint,
      params: { slug, _embed: true }
    });
    const populated = await populate({ response, state });

    if (!populated.length)
      throw new Error(`Post of type "${type}" with slug "${slug}" not found.`);

    [{ id }] = populated;
  }

  // Init data
  Object.assign(source.data[route], {
    id,
    type,
    isPostType: true,
    ...truths
  });
};

export default postTypeHandler;
