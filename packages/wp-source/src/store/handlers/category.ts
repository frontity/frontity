import { Handler } from "../../types";
import {
  getIdBySlug,
  normalize,
  getTotal,
  getTotalPages,
  addPage
} from "./utils";

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

  const catId = await getIdBySlug(ctx, "category", params.slug);

  const data = state.data[name];

  const doesNotExist = !state.category[catId];
  const hasNotPage =
    doesNotExist || !(data.page && data.page[page]);

  let entities: any;
  let total: number;
  let totalPages: number;

  if (doesNotExist || hasNotPage) {
    const response = await effects.api.get({
      endpoint: "posts",
      params: { categories: catId, search: params.s, page }
    });

    // Throw an error if the request has failed
    if (!response.ok) throw new Error();

    entities = await normalize(response);
    total = getTotal(response);
    totalPages = getTotalPages(response);

    // Add entities to the state
    actions.populate({ entities });
  }

  // Init the category if it doesn't exist
  if (doesNotExist) {
    const { link } = state.category[catId];
    Object.assign(data, {
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
  if (hasNotPage) addPage(data, page, entities);
};

export default categoryHandler;
