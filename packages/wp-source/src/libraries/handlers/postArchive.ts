import { Handler } from "../../../types";

const postArchiveHandler: Handler = async ({ route, state, libraries }) => {
  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { page, query } = parse(route);

  // 2. fetch the specified page
  const response = await api.get({
    endpoint: state.source.postEndpoint,
    params: { search: query.s, page, _embed: true, ...state.source.params }
  });

  // 3. populate response and add page to data
  const items = await populate({ response, state });
  if (page > 0 && !items.length) throw new Error("Page doesn't exist.");

  // 4. get posts and pages count
  const total = getTotal(response);
  const totalPages = getTotalPages(response);

  // 5. add data to source
  Object.assign(state.source.data[route], {
    type: "post",
    items,
    total,
    totalPages,
    isArchive: true,
    isPostTypeArchive: true,
    isPostArchive: true
  });
};

export default postArchiveHandler;
