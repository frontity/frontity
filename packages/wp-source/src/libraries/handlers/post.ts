import { Handler } from "../../../types";
import getIdBySlug from "./utils/get-id-by-slug";

const postHandler: Handler = async ({ route, params, state, libraries }) => {
  const { slug } = params;
  let id = getIdBySlug(state.source.post, slug);

  // Get post from REST API if not found
  if (!id) {
    const response = await libraries.source.api.get({
      endpoint: state.source.postEndpoint,
      params: { slug, _embed: true, ...state.source.params }
    });

    const populated = await libraries.source.populate({ response, state });

    if (!populated.length)
      throw new Error(`Post with slug "${slug}" not found.`);

    [{ id }] = populated;
  }

  // Init data
  Object.assign(state.source.data[route], {
    id,
    type: "post",
    isPostType: true,
    isPost: true
  });
};

export default postHandler;
