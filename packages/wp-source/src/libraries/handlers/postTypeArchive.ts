import { Handler } from "../../../";
import getTotal from "./utils/get-total";
import getTotalPages from "./utils/get-total-pages";

const postArchiveHandler = ({
  type,
  endpoint
}: {
  type: string;
  endpoint: string;
}): Handler => async ({ route, state, libraries }) => {
  const { source } = state;
  const { api, populate, parse } = libraries.source;
  const { page, query } = parse(route);

  // 2. fetch the specified page
  const response = await api.get({
    endpoint,
    params: { search: query.s, page, _embed: true }
  });

  // 3. throw an error if page is out of range
  const total = getTotal(response);
  const totalPages = getTotalPages(response);
  if (page > totalPages) throw new Error("Page doesn't exist.");

  // 4. populate response and add page to data
  const items = await populate({ response, state });

  // 5. add data to source
  Object.assign(source.data[route], {
    type,
    items,
    total,
    totalPages,
    isArchive: true,
    isPostTypeArchive: true
  });
};

export default postArchiveHandler;
