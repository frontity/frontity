import { Handler } from "../types";
import { getIdBySlug } from "./utils";

// 1. category isn't in "source.category"
//    !source.category[catId]
// 2. category exists in "source.category"
//     source.category[catId]
// 3. category exists but not the page (!source.data[name].page[page])
//    !source.data[name].page[page]

const categoryHandler: Handler = async (ctx, { name, params, page = 1 }) => {
  const state = ctx.state.source;
  const actions = ctx.actions.source;
  const effects = ctx.effects.source;

  const catId = await getIdBySlug(ctx, 'category', params.slug);

  const doesNotExist = !state.category[catId];
  const hasNotPage =
    doesNotExist || !(state.data[name].page && state.data[name].page[page]);

  let isOk: boolean;
  let entities: any;
  let total: number;
  let totalPages: number;

  if (doesNotExist || hasNotPage) {
    ({ isOk, entities, total, totalPages } = await effects.api.get({
      endpoint: "posts",
      params: { categories: catId, search: params.s, page }
    }));

    // Throw an error if the request has failed
    if (!isOk) throw new Error();

    // Add entities to the state
    actions.populate({ entities });
  }

  // Init the category if it doesn't exist
  if (doesNotExist) {
    const { link } = state.category[catId];
    Object.assign(state.data[name], {
      type: "category",
      id: catId,
      link,
      isArchive: true,
      isTaxonomy: true,
      isCategory: true,
      total,
      totalPages
    });
  }

  // Add the page if it doesn't exist
  if (hasNotPage) {
    state.data[name].page = state.data[name].page || [];
    state.data[name].page[page || 1] = entities.map(({ type, id, link }) => ({
      type,
      id,
      link
    }));
  }
};

export default categoryHandler;
