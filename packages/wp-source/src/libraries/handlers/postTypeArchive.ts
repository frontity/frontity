import { Handler } from "../../../types";
import capitalize from "./utils/capitalize";
import { ServerError } from "../../errors";

const postTypeArchiveHandler = ({
  type,
  endpoint
}: {
  type: string;
  endpoint: string;
}): Handler => async ({ route, state, libraries }) => {
  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { page, query } = parse(route);

  // 1. fetch the specified page
  const response = await api.get({
    endpoint: endpoint === "posts" ? state.source.postEndpoint : endpoint,
    params: { search: query.s, page, _embed: true, ...state.source.params }
  });

  // 2. populate response
  const items = await populate({ response, state });
  if (page > 1 && items.length === 0)
    throw new ServerError(`post archive doesn't have page ${page}`, 404);

  // 3. get posts and pages count
  const total = getTotal(response);
  const totalPages = getTotalPages(response);

  // 4. add data to source
  Object.assign(state.source.data[route], {
    type,
    items,
    total,
    totalPages,
    isArchive: true,
    isPostTypeArchive: true,
    [`is${capitalize(type)}Archive`]: true
  });
};

export default postTypeArchiveHandler;
