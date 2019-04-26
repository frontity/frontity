import { Handler, PostTypeData, EntityData } from "../../types";
import { populate } from "../helpers";

const pageHandler: Handler = async (ctx, { name, params }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  const { slug } = params;

  let page: EntityData = Object.values(state.page).find(
    (p: any) => p.slug === slug
  );

  let data = state.data(name);

  // If not found
  if (!page) {
    console.log(name);
    const response = await effects.api.get({
      endpoint: "pages",
      params: { slug, _embed: true }
    });

    [page] = await populate(ctx, response);
  }

  // Init data
  const { type, id } = page;
  data = {
    type,
    id,
    isPostType: true,
    isPage: true,
    isFetching: true
  };

  state.dataMap[name] = data;
};

export default pageHandler;
