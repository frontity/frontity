import { Handler } from "../../../types";
import getIdBySlug from "./utils/get-id-by-slug";

const postHandler: Handler = async ({ route, params, state, libraries }) => {
  const { api, populate } = libraries.source;

  const { slug } = params;
  let id = getIdBySlug(state.source.post, slug);

  // Get post from REST API if not found
  if (!id) {
    const response = await api.get({
      endpoint: state.source.postEndpoint,
      params: { slug, _embed: true, ...state.source.params }
    });

    const populated = await populate({ response, state });

    if (populated.length === 0)
      throw new Error(`post with slug "${slug}" not found`);

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
