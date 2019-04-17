import { Handler } from "../types";
import {
  getIdBySlug,
  normalize,
  getTotal,
  getTotalPages,
  addPage
} from "./utils";

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

  const data = state.data[name];

  const doesNotExist = !state.author[authorId];
  const hasNotPage = doesNotExist || !(data.page && data.page[page]);

  let entities: any;
  let total: number;
  let totalPages: number;

  if (doesNotExist || hasNotPage) {
    const response = await effects.api.get({
      endpoint: "posts",
      params: { author: authorId, search: params.s, page }
    });

    entities = await normalize(response);
    total = getTotal(response);
    totalPages = getTotalPages(response);

    // Add entities to the state
    actions.populate({ entities });
  }

  // Init the author if it doesn't exist
  if (doesNotExist) {
    const { link } = state.author[authorId];
    Object.assign(data, {
      type: "author",
      id: authorId,
      link,
      isAuthor: true,
      total,
      totalPages
    });
  }

  // Add the page if it doesn't exist
  if (hasNotPage) addPage(data, page, entities);
};

export default authorHandler;
