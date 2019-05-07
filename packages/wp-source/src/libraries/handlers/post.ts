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

    const populated = await populate(state, response);

    if (!populated.length)
      throw new Error(`Post with slug "${slug}" not found.`);

    [{ id }] = populated;
  }

  // Init data
  state.dataMap[path] = {
    id,
    type: "post",
    isPostType: true,
    isPost: true,
    isFetching: true
  };
};

export default postHandler;
