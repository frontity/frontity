import { Handler } from "../types";
import { normalize } from "./utils";

const pageHandler: Handler = async (ctx, { name, params }) => {
  const state = ctx.state.source;
  const actions = ctx.actions.source;
  const effects = ctx.effects.source;

  const { slug } = params;

  let page: any = Object.values(state.page).find((p: any) => p.slug === slug);

  // If not found
  if (!page) {
    const response = await effects.api.get({
      endpoint: "pages",
      params: { slug, _embed: true }
    });

    const entities = await normalize(response);
    [page] = entities;
    actions.populate({ entities });
  }

  // Init data
  const { type, id, link } = page;
  Object.assign(state.data[name], {
    type,
    id,
    link,
    isPostType: true,
    isPage: true
  });
};

export default pageHandler;
