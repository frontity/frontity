import { Handler } from "../../../";
import getTotal from "./utils/get-total";
import getTotalPages from "./utils/get-total-pages";

const dateHandler: Handler = async (source, { route, params, libraries }) => {
  const { api, populate, parse } = libraries.source;
  const { page, query } = parse(route);

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
    endpoint: "posts",
    params: {
      _embed: true,
      after: after.toISOString(),
      before: before.toISOString(),
      search: query.s,
      page
    }
  });

  // 3. throw an error if page is out of range
  const total = getTotal(response);
  const totalPages = getTotalPages(response);
  if (page > totalPages) throw new Error("Page doesn't exist.");

  // 4. populate response and add page to data
  const items = await populate(source, response);

  // 5. add data to source
  source.data[route] = {
    year,
    month,
    day,
    items,
    total,
    totalPages,
    isArchive: true,
    isDate: true,
    isFetching: true
  };
};

export default dateHandler;
