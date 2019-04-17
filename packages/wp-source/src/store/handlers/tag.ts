import { Handler } from "../types";
import {
  getIdBySlug,
  normalize,
  getTotal,
  getTotalPages,
  addPage
} from "./utils";

// 1. tag isn't in "source.tag"
//    !source.tag[tagId]
// 2. tag exists in "source.tag"
//     source.tag[tagId]
// 3. tag exists but not the page (!source.data[name].page[page])
//    !source.data[name].page[page]

const tagHandler: Handler = async (ctx, { name, params, page = 1 }) => {
  const state = ctx.state.source;
  const actions = ctx.actions.source;
  const effects = ctx.effects.source;

  const tagId = await getIdBySlug(ctx, "tag", params.slug);

  const data = state.data[name];

  const doesNotExist = !state.tag[tagId];
  const hasNotPage = doesNotExist || !(data.page && data.page[page]);

  let entities: any;
  let total: number;
  let totalPages: number;

  if (doesNotExist || hasNotPage) {
    const response = await effects.api.get({
      endpoint: "posts",
      params: { categories: tagId, search: params.s, page }
    });

    entities = await normalize(response);
    total = getTotal(response);
    totalPages = getTotalPages(response);

    // Add entities to the state
    actions.populate({ entities });
  }

  // Init the tag if it doesn't exist
  if (doesNotExist) {
    const { link } = state.tag[tagId];
    Object.assign(data, {
      type: "tag",
      id: tagId,
      link,
      isArchive: true,
      isTaxonomy: true,
      isTag: true,
      total,
      totalPages
    });
  }

  // Add the page if it doesn't exist
  if (hasNotPage) addPage(data, page, entities);
};

export default tagHandler;
