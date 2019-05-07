import { Handler } from "../../types";
import getIdBySlug from "./utils/get-id-by-slug";

const postHandler: Handler = async (state, { path, params, libraries }) => {
  const { api, populate } = libraries.source;

  const { slug } = params;
  let id = getIdBySlug(state.post, slug);

  // Get post from REST API if not found
  if (!id) {
    const response = await api.get({
      endpoint: "posts",
      params: { slug, _embed: true }
    });

    // the next line will fail if post with id doesn't exist
    [{ id }] = await populate(state, response);
  }

  // Init data
  state.dataMap[path] = {
    id,
    type: "post",
    isPostType: true,
    isPost: true,
    isFetching: true,
  };
};

export default postHandler;
