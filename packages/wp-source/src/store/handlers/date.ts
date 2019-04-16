import { Handler } from "../types";

const dateHandler: Handler = async (ctx, { name, params, page = 1 }) => {
  const state = ctx.state.source;
  const actions = ctx.actions.source;
  const effects = ctx.effects.source;

  // Build date property
  const { year, month = "01", day = "01" } = params;
  const date = `${year}-${month}-${day}T00:00:00`;

  const hasNotPage =
    !(state.data[name].page && state.data[name].page[page]);

  let isOk: boolean;
  let entities: any;
  let total: number;
  let totalPages: number;

  if (hasNotPage) {
    ({ isOk, entities, total, totalPages } = await effects.api.get({
      endpoint: "posts",
      params: { after: date, search: params.s, page }
    }));

    // Throw an error if the request has failed
    if (!isOk) throw new Error();

    // Add entities to the state
    actions.populate({ entities });
  }

  // Init the date
  Object.assign(state.data[name], {
    date,
    isArchive: true,
    isDate: true,
    total,
    totalPages
  });

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

export default dateHandler;
