import { Handler } from "../../types";
import { getTotal, getTotalPages } from "../helpers";

const dateHandler: Handler = async (ctx, { path, params, page = 1 }) => {
  const state = ctx.state.source;
  const { api, populate } = ctx.effects.source;

  // Build date property
  const { year, month = "01", day = "01" } = params;
  const date = `${year}-${month}-${day}T00:00:00`;

  // 0. Get data from store
  let data = state.dataMap[path];

  // 1. init data if it isn't already
  if (!data.isDate) {
    data = {
      date,
      pages: [],
      isArchive: true,
      isDate: true,
      isFetching: true
    };
    state.dataMap[path] = data;
  }

  // 2. fetch the specified page if necessary
  if (!data.pages[page - 1]) {
    const response = await api.get({
      endpoint: "posts",
      params: { after: date, search: params.s, page }
    });
    // populate response and add page to data
    data.pages[page - 1] = await populate(state, response);
    // and assign total and totalPages values
    data.total = getTotal(response);
    data.totalPages = getTotalPages(response);
  }
};

export default dateHandler;
