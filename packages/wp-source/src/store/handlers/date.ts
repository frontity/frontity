import { Handler, DateData } from "../../types";
import { populate, getTotal, getTotalPages } from "./utils";

const dateHandler: Handler = async (ctx, { name, params, page = 1 }) => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  // Build date property
  const { year, month = "01", day = "01" } = params;
  const date = `${year}-${month}-${day}T00:00:00`;

  const data = <DateData>state.data[name];

  const hasNotPage = !(data.page && data.page[page]);

  let response: Response;

  if (hasNotPage) {
    response = await effects.api.get({
      endpoint: "posts",
      params: { after: date, search: params.s, page }
    });

    const dataPage = await populate(ctx, response);

    // Add the received page of entities
    data.page = data.page || [];
    data.page[page - 1] = dataPage; // transform page number to index!!
  }

  // Init the date
  Object.assign(data, {
    date,
    isArchive: true,
    isDate: true,
    total: getTotal(response),
    totalPages: getTotalPages(response),
  });
};

export default dateHandler;