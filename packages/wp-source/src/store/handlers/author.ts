import { Handler, AuthorData } from "../../types";
import { getIdBySlug, getTotal, getTotalPages, populate } from "./utils";

// 1. author isn't in "source.author"
//    !source.author[authorId]
// 2. author exists in "source.author"
//     source.author[authorId]
// 3. author exists but not the page (!source.data[name].page[page])
//    !source.data[name].page[page]

const authorHandler: Handler = async (
  ctx,
  { name, params, page = 1, isPopulated }
) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  const authorId = await getIdBySlug(ctx, "author", params.slug);

  const data = <AuthorData>state.data[name];

  const doesNotExist = !state.author[authorId];
  const hasNotPage = doesNotExist || !(data.page && data.page[page]);

  let response: Response;

  if (!isPopulated && (doesNotExist || hasNotPage)) {
    response = await effects.api.get({
      endpoint: "posts",
      params: { author: authorId, search: params.s, page, _embed: true }
    });

    await populate(ctx, { response, name, page });
  }

  // Init the author if it doesn't exist
  if (doesNotExist) {
    const { link } = state.author[authorId];
    Object.assign(data, {
      type: "author",
      id: authorId,
      link,
      isAuthor: true,
      total: getTotal(response),
      totalPages: getTotalPages(response)
    });
  }
};

export default authorHandler;
