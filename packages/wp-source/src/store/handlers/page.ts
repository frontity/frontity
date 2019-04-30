import { Handler, PostTypeData, EntityData } from "../../types";
import { populate } from "../helpers";

const pageHandler: Handler = async (ctx, { path, params }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  const { slug } = params;

  let page: EntityData = Object.values(state.page).find(
    (p: any) => p.slug === slug
  );

  let data = state.data(path);

  // If not found
  if (!page) {
    console.log(path);
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

  state.dataMap[path] = data;
};

export default pageHandler;
