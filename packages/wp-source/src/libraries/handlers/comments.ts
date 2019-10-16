import { Handler } from "../../../types";

const commentsHandler: Handler = async ({
  route,
  params,
  state,
  libraries
}) => {
  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { path, page, query } = parse(route);
  const { postId } = params;

  // 1. search id in state or get it from WP REST API
  let { id } = state.source.get(path);
  if (!id) {
    // Request author from WP
    const response = await api.get({
      endpoint: "comments",
      params: { post: postId }
    });
    const [entity] = await populate({ response, state });
    if (!entity)
      throw new Error(
        `entity from endpoint "comments" with postId "${postId}" not found`
      );
    id = entity.id;
  }

  // 2. fetch the specified page
  const response = await api.get({
    endpoint: "comments",
    params: {
      post: postId,
      search: query.s,
      page,
      _embed: true,
      ...state.source.params
    }
  });

  // 3. populate response
  const items = await populate({ response, state });
  if (page > 1 && items.length === 0)
    throw new Error(`comments for post "${postId}" don't have page ${page}`);

  // 4. get posts and pages count
  const total = getTotal(response);
  const totalPages = getTotalPages(response);

  // 5. add data to source
  const currentPageData = state.source.data[route];
  const firstPageData = state.source.data[path];

  Object.assign(currentPageData, {
    id: firstPageData.id,
    items,
    total,
    totalPages,
    isComments: true
  });
};

export default commentsHandler;
