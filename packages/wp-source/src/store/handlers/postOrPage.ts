import { Handler, PostTypeData, EntityData } from "../../types";
import { populate } from "../helpers";

const postOrPageHandler: Handler = async (ctx, { path, params }) => {
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
    [post] = await populate(ctx, postResponse);
    [page] = await populate(ctx, pageResponse);
  }

  // Init data
  const { type, id } = post || page;
  if (post || page) {
    state.dataMap[path] = {
      type,
      id,
      isPostType: true,
      isFetching: true
    };
  }

  if (post) state.dataMap[path].isPost = true;
  else if (page) state.dataMap[path].isPage = true;
};

export default postOrPageHandler;
