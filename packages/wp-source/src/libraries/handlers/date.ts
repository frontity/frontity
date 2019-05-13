import { Handler } from "../../../";
import getTotal from "./utils/get-total";
import getTotalPages from "./utils/get-total-pages";

const dateHandler: Handler = async (
  state,
  { path, params, page = 1, libraries }
) => {
  const { api, populate } = libraries.source;

  // Build date property
  const year = parseInt(params.year);
  const month = params.month && parseInt(params.month) - 1;
  const day = params.day && parseInt(params.day);

  const after = new Date(
    `${params.year}-${params.month || "01"}-${params.day || "01"}`
  );
  const before = new Date(after);

  if (!month) before.setFullYear(year + 1);
  else if (!day) before.setMonth(month + 1);
  else before.setDate(day + 1);

  // 0. Get data from store
  let data = state.dataMap[path];

  // 1. init data if it isn't already
  if (!data.isDate) {
    data = {
      year,
      month,
      day,
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
      params: {
        after: after.toISOString(),
        before: before.toISOString(),
        search: params.s,
        page
      }
    });
    // populate response and add page to data
    data.pages[page - 1] = await populate(state, response);
    // and assign total and totalPages values
    data.total = getTotal(response);
    data.totalPages = getTotalPages(response);
  }
};

export default dateHandler;
