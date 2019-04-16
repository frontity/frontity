import { Handler } from "../types";

const postOrPageHandler: Handler = async (ctx, { name, params }) => {
  const state = ctx.state.source;
  const actions = ctx.actions.source;
  const effects = ctx.effects.source;

  const { slug } = params;

  let isPost: boolean;
  let isPage: boolean;

  // First, search post and page with the given slug
  const sameSlug = (p: any) => p.slug === slug;
  let post: any = Object.values(state.post).find(sameSlug);
  let page: any = Object.values(state.page).find(sameSlug);

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
    isPost = !!postResponse.entities.length;
    isPage = !!pageResponse.entities.length;

    if (isPost) {
      post = postResponse.entities[0];
      actions.populate({ entities: post });
    } else if (isPage) {
      page = pageResponse.entities[0];
      actions.populate({ entities: page });
    }
  }

  // Init data
  if (isPost || isPage) {
    const { type, id, link } = post || page;
    Object.assign(state.data[name], {
      type,
      id,
      link,
      isPostType: true,
      isPost,
      isPage
    });
  } else {
    Object.assign(state.data[name], {
      is404: true
    });
  }
};

export default postOrPageHandler;
