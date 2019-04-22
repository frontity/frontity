import { Handler } from "../../types";
import { normalize } from "./utils";

const postHandler: Handler = async (ctx, { name, params }) => {
  const state = ctx.state.source;
  const actions = ctx.actions.source;
  const effects = ctx.effects.source;

  const { slug } = params;

  let post: any = Object.values(state.post).find((p: any) => p.slug === slug);

  // If not found
  if (!post) {
    const response = await effects.api.get({
      endpoint: "posts",
      params: { slug, _embed: true }
    });

    const entities = await normalize(response);
    [post] = entities;
    actions.populate({ entities });
  }

  // Init data
  const { type, id, link } = post;
  Object.assign(state.data[name], {
    type,
    id,
    link,
    isPostType: true,
    isPost: true,
  });
};

export default postHandler;
