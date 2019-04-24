import { Handler, PostTypeData, EntityData } from "../../types";
import { populate } from "./utils";

const postOrPageHandler: Handler = async (ctx, { name, params }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  const { slug } = params;

  // First, search post and page with the given slug
  const sameSlug = (p: any) => p.slug === slug;
  let post = <EntityData>Object.values(state.post).find(sameSlug);
  let page = <EntityData>Object.values(state.page).find(sameSlug);

  // If none is found
  if (!(post || page)) {
    const [postResponse, pageResponse] = await Promise.all([
      effects.api.get({
        endpoint: "posts",
        params: { slug, _embed: true }
      }),
      effects.api.get({
        endpoint: "pages",
        params: { slug, _embed: true }
      })
    ]);

    // Add entities to the state
    [post] = await populate(ctx, { response: postResponse, name });
    [page] = await populate(ctx, { response: pageResponse, name });
  }

  // Init data
  if (post || page) {
    const { type, id, link } = post || page;
    Object.assign(state.data[name], {
      type,
      id,
      link,
      isPostType: true,
      isPost: !!post,
      isPage: !!page
    });
  } else {
    Object.assign(state.data[name], {
      is404: true
    });
  }
};

export default postOrPageHandler;
