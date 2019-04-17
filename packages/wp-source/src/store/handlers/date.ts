import { Handler } from "../types";
import { normalize, getTotal, getTotalPages, addPage } from "./utils";

const dateHandler: Handler = async (ctx, { name, params, page = 1 }) => {
  const state = ctx.state.source;
  const actions = ctx.actions.source;
  const effects = ctx.effects.source;

  // Build date property
  const { year, month = "01", day = "01" } = params;
  const date = `${year}-${month}-${day}T00:00:00`;

  const data = state.data[name];

  const hasNotPage = !(data.page && data.page[page]);

  let entities: any;
  let total: number;
  let totalPages: number;

  if (hasNotPage) {
    const response = await effects.api.get({
      endpoint: "posts",
      params: { after: date, search: params.s, page }
    });

    entities = await normalize(response);
    total = getTotal(response);
    totalPages = getTotalPages(response);

    // Add entities to the state
    actions.populate({ entities });

    // Add the page if it doesn't exist
    addPage(data, page, entities);
  }

  // Init the date
  Object.assign(data, {
    date,
    isArchive: true,
    isDate: true,
    total,
    totalPages
  });
};

export default dateHandler;
