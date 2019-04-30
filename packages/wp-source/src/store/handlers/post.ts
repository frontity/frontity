import { Handler, PostTypeData, EntityData } from "../../types";
import { populate } from "../helpers";

const postHandler: Handler = async (ctx, { path, params }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  const { slug } = params;

  let data = state.data(path);

  let post: EntityData = Object.values(state.post).find(
    (p: any) => p.slug === slug
  );

  // If not found
  if (!post) {
    const response = await effects.api.get({
      endpoint: "posts",
      params: { slug, _embed: true }
    });

    [post] = await populate(ctx, response);
  }

  // Init data
  const { type, id } = post;
  data = {
    type,
    id,
    isPostType: true,
    isPost: true
  };
  state.dataMap[path] = data;
};

export default postHandler;
