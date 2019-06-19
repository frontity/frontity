import { Handler } from "../../../";
import getTotal from "./utils/get-total";
import getTotalPages from "./utils/get-total-pages";

const postArchiveHandler: Handler = async ({ route, state, libraries }) => {
  const { source } = state;
  const { api, populate, parse } = libraries.source;
  const { page, query } = parse(route);

  // 2. fetch the specified page
  const response = await api.get({
    endpoint: "posts",
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
    type: "post",
    items,
    total,
    totalPages,
    isArchive: true,
    isPostTypeArchive: true,
    isPostArchive: true,
    isHome: true
  });
};

export default postArchiveHandler;
