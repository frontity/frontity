import { Handler } from "../../types";
import { getIdBySlug } from "../helpers";

const postHandler: Handler = async (ctx, { path, params }) => {
  const state = ctx.state.source;
  const { api, populate } = ctx.effects.source;

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
