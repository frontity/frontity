import { Handler } from "../types";
import { getIdBySlug } from "./utils";

// 1. author isn't in "source.author"
//    !source.author[authorId]
// 2. author exists in "source.author"
//     source.author[authorId]
// 3. author exists but not the page (!source.data[name].page[page])
//    !source.data[name].page[page]

const authorHandler: Handler = async (ctx, { name, params, page = 1 }) => {
  const state = ctx.state.source;
  const actions = ctx.actions.source;
  const effects = ctx.effects.source;

  const authorId = await getIdBySlug(ctx, "author", params.slug);

  const doesNotExist = !state.author[authorId];
  const hasNotPage =
    doesNotExist || !(state.data[name].page && state.data[name].page[page]);

  let isOk: boolean;
  let entities: any;
  let total: number;
  let totalPages: number;

  if (doesNotExist || hasNotPage) {
    ({ isOk, entities, total, totalPages } = await effects.api.get({
      endpoint: "posts",
      params: { author: authorId, search: params.s, page }
    }));

    // Throw an error if the request has failed
    if (!isOk) throw new Error();

    // Add entities to the state
    actions.populate({ entities });
  }

  // Init the author if it doesn't exist
  if (doesNotExist) {
    const { link } = state.author[authorId];
    Object.assign(state.data[name], {
      type: "author",
      id: authorId,
      link,
      isAuthor: true,
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

export default authorHandler;
