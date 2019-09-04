import { Handler } from "../../../types";

const postArchiveHandler: Handler = async ({ route, state, libraries }) => {
  const { page, query } = libraries.source.parse(route);

  // 2. fetch the specified page
  const response = await libraries.source.api.get({
    endpoint: state.source.postEndpoint,
    params: { search: query.s, page, _embed: true, ...state.source.params }
  });

  // 3. throw an error if page is out of range
  const total = libraries.source.getTotal(response);
  const totalPages = libraries.source.getTotalPages(response);
  if (page > totalPages) throw new Error("Page doesn't exist.");

  // 4. populate response and add page to data
  const items = await libraries.source.populate({ response, state });

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
