import { Handler, DateData } from "../../types";
import { populate, getTotal, getTotalPages } from "../helpers";

const dateHandler: Handler = async (ctx, { path, params, page = 1 }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  // Build date property
  const { year, month = "01", day = "01" } = params;
  const date = `${year}-${month}-${day}T00:00:00`;

  // 0. Get data from store
  let data = state.data(path);

  // 1. init data if it isn't already
  if (!data.isDate) {
    data = {
      date,
      pages: [],
      isArchive: true,
      isDate: true,
      isFetching: true,
    };
    state.dataMap[path] = data;
  }
  
  if (!data.pages[page - 1]) {
    const response = await effects.api.get({
      endpoint: "posts",
      params: { after: date, search: params.s, page }
    });
    // populate response and add page to data
    data.pages[page - 1] = await populate(ctx, response);
    // and assign total and totalPages values
    data.total = getTotal(response);
    data.totalPages = getTotalPages(response);
  }
};

export default dateHandler;