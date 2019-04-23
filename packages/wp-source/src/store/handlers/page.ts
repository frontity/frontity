import { Handler, PostTypeData, EntityData } from "../../types";
import { populate } from "./utils";

const pageHandler: Handler = async (ctx, { name, params }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  const { slug } = params;

  let page: EntityData = Object.values(state.page).find(
    (p: any) => p.slug === slug
  );

  const data = <PostTypeData>state.data[name];

  // If not found
  if (!page) {
    const response = await effects.api.get({
      endpoint: "pages",
      params: { slug, _embed: true }
    });

    [page] = await populate(ctx, response);
  }

  // Init data
  const { type, id, link } = page;
  Object.assign(data, {
    type,
    id,
    link,
    isPostType: true,
    isPage: true
  });
};

export default pageHandler;
