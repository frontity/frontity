import { Handler } from "../../types";
import { addPage, normalize, getTotal, getTotalPages } from "./utils";

const postArchiveHandler: Handler = async (ctx, { name, params, page = 1 }) => {
  const state = ctx.state.source;
  const actions = ctx.actions.source;
  const effects = ctx.effects.source;

  const data = state.data[name];

  const hasNotPage = !(data.page && data.page[page]);

  let entities: any;
  let total: number;
  let totalPages: number;

  if (hasNotPage) {
    const response = await effects.api.get({
      endpoint: "posts",
      params: { search: params.s, page }
    });

    entities = await normalize(response);
    total = getTotal(response);
    totalPages = getTotalPages(response);

    // Add entities to the state
    actions.populate({ entities });

    // Add the page if it doesn't exist
    addPage(data, page, entities);
  }

  // Init data
  Object.assign(data, {
    type: "post",
    isArchive: true,
    isPostTypeArchive: true,
    isPostArchive: true,
    isHome: true,
    total,
    totalPages
  });
};

export default postArchiveHandler;
