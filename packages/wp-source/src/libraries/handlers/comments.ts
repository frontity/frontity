import { Handler } from "../../../types";

const commentsHandler: Handler = async ({
  route,
  params,
  state,
  libraries
}) => {
  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { page, query } = parse(route);
  const postId = parseInt(params.postId);

  // 1. fetch the specified page
  const response = await api.get({
    endpoint: "comments",
    params: {
      post: postId,
      search: query.s,
      page,
      ...state.source.params
    }
  });

  // 2. populate response
  const rawItems = await populate({ response, state });
  const parentItems = {};
  rawItems.forEach(item => {
    parentItems[item.parent] = [...(parentItems[item.parent] || []), item];
  });
  const items = parentItems[0];
  const addChildren = arr => {
    arr.forEach(item => {
      if (parentItems[item.id]) {
        item.children = parentItems[item.id];
        addChildren(item.children);
      }
    });
  };
  addChildren(items);

  if (page > 1 && items.length === 0)
    throw new Error(`comments for post "${postId}" don't have page ${page}`);

  // 3. get posts and pages count
  const total = getTotal(response);
  const totalPages = getTotalPages(response);

  // 4. add data to source
  const currentPageData = state.source.data[route];

  Object.assign(currentPageData, {
    postId,
    items,
    total,
    totalPages,
    areComments: true
  });
};

export default commentsHandler;
