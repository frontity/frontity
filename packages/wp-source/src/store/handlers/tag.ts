import { Handler, TagData } from "../../types";
import { getIdBySlug, populate, getTotal, getTotalPages } from "./utils";

// 1. tag isn't in "source.tag"
//    !source.tag[catId]
// 2. tag exists in "source.tag"
//     source.tag[catId]
// 3. tag exists but not the page (!source.data[name].page[page])
//    !source.data[name].page[page]

const tagHandler: Handler = async (ctx, { name, params, page = 1 }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  const catId = await getIdBySlug(ctx, "tag", params.slug);
  const data = <TagData>state.data[name];

  const doesNotExist = !state.tag[catId];
  const hasNotPage = doesNotExist || !(data.page && data.page[page]);

  let response: Response;

  if (doesNotExist || hasNotPage) {
    // Fetch data from the WP REST API
    response = await effects.api.get({
      endpoint: "posts",
      params: { categories: catId, search: params.s, page, _embed: true }
    });

    // Add entities to the state
    const dataPage = await populate(ctx, response);

    // Add the received page of entities
    data.page = data.page || [];
    data.page[page - 1] = dataPage; // transform page number to index!!
  }

  // Init the tag if it doesn't exist
  if (doesNotExist) {
    const { link } = state.tag[catId];

    Object.assign(data, {
      type: "tag",
      id: catId,
      link,
      isArchive: true,
      isTaxonomy: true,
      isTag: true,
      total: getTotal(response),
      totalPages: getTotalPages(response)
    });
  }
};

export default tagHandler;
