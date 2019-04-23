import { Handler, CategoryData } from "../../types";
import { getIdBySlug, populate, getTotal, getTotalPages } from "./utils";

// 1. category isn't in "source.category"
//    !source.category[catId]
// 2. category exists in "source.category"
//     source.category[catId]
// 3. category exists but not the page (!source.data[name].page[page])
//    !source.data[name].page[page]

const categoryHandler: Handler = async (
  ctx,
  { name, params, page = 1, isPopulated }
) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  const catId = await getIdBySlug(ctx, "category", params.slug);
  const data = <CategoryData>state.data[name];

  const doesNotExist = !state.category[catId];
  const hasNotPage = doesNotExist || !(data.page && data.page[page]);

  let response: Response;

  if (!isPopulated && (doesNotExist || hasNotPage)) {
    // Fetch data from the WP REST API
    response = await effects.api.get({
      endpoint: "posts",
      params: { categories: catId, search: params.s, page, _embed: true }
    });

    // Add entities to the state
    await populate(ctx, { response, name, page });
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
      total: getTotal(response),
      totalPages: getTotalPages(response)
    });
  }
};

export default categoryHandler;
