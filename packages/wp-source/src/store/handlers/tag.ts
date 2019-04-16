import { Handler } from "../types";
import { getIdBySlug } from "./utils";

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

  const tagId = await getIdBySlug(ctx, 'tag', params.slug);

  const doesNotExist = !state.tag[tagId];
  const hasNotPage =
    doesNotExist || !(state.data[name].page && state.data[name].page[page]);

  let isOk: boolean;
  let entities: any;
  let total: number;
  let totalPages: number;

  if (doesNotExist || hasNotPage) {
    ({ isOk, entities, total, totalPages } = await effects.api.get({
      endpoint: "posts",
      params: { categories: tagId, search: params.s, page }
    }));

    // Throw an error if the request has failed
    if (!isOk) throw new Error();

    // Add entities to the state
    actions.populate({ entities });
  }

  // Init the tag if it doesn't exist
  if (doesNotExist) {
    const { link } = state.tag[tagId];
    Object.assign(state.data[name], {
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
  if (hasNotPage) {
    state.data[name].page = state.data[name].page || [];
    state.data[name].page[page || 1] = entities.map(({ type, id, link }) => ({
      type,
      id,
      link
    }));
  }
};

export default tagHandler;
