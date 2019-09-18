import { Handler } from "../../../types";

const dateHandler: Handler = async ({ route, params, state, libraries }) => {
  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { path, page, query } = parse(route);

  // 1. build date properties
  const year = parseInt(params.year);
  const month = params.month && parseInt(params.month);
  const day = params.day && parseInt(params.day);

  const after = new Date(
    `${params.year}-${params.month || "01"}-${params.day || "01"}`
  );
  const before = new Date(after);

  if (!month) before.setFullYear(year + 1);
  else if (!day) before.setMonth(month);
  else before.setDate(day + 1);

  // 2. fetch the specified page
  const response = await api.get({
    endpoint: state.source.postEndpoint,
    params: {
      _embed: true,
      after: after.toISOString(),
      before: before.toISOString(),
      search: query.s,
      page,
      ...state.source.params
    }
  });

  // 3. populate response
  const items = await populate({ response, state });
  if (items.length === 0)
    throw new Error(`date "${path}" doesn't have page ${page}`);

  // 4. get posts and pages count
  const total = getTotal(response);
  const totalPages = getTotalPages(response);

  // 5. add data to source
  Object.assign(state.source.data[route], {
    year,
    month,
    day,
    items,
    total,
    totalPages,
    isArchive: true,
    isDate: true
  });
};

export default dateHandler;
