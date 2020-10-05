import { Handler } from "@frontity/wp-source/types";
import { CommentItem } from "../types";

/**
 * A {@link Handler} for fetching comments by post ID.
 *
 * The handler gets all comments published in the specified post and creates a
 * tree structure with comments and their replies in the data object.
 *
 * @example
 * ```js
 *   libraries.source.handlers.push({
 *     name: "comments",
 *     priority: 20,
 *     pattern: "@comments/:postId(\\d+)",
 *     func: commentsHandler,
 *   })
 * ```
 *
 * @param params - Defined in {@link Handler}.
 *
 * @returns A Promise that will resolve once the comments have loaded.
 */
export const commentsHandler: Handler = async ({
  route,
  params,
  state,
  libraries,
}) => {
  const { api, populate, getTotal, getTotalPages } = libraries.source;

  // Get the post ID from `params` (it is the ID passed in the link).
  const postId = parseInt(params.postId);

  /**
   * Utility that fetches and populates pages of 100 comments,
   * the most recent first.
   *
   * @param params - Object with the following params:
   * - `postId` (`number`): post ID.
   * - `page` (`number`): the page number.
   *
   * @returns Object with the following properties:
   * - `response`: object of type {@link Response}.
   * - `populated`: array of type {@link EntityData}.
   */
  const fetchComments = async ({ postId, page }) => {
    // Fetch the first page of 100 comments.
    const response = await api.get({
      endpoint: "comments",
      params: {
        post: postId,
        page,
        // Fetch as many comments as possible.
        per_page: 100, // eslint-disable-line @typescript-eslint/camelcase
        ...state.source.params,
        // Do not get embedded entities.
        _embed: false,
      },
    });

    // Populate response
    const populated = await populate({ response, state });

    // Return response and populated.
    return { response, populated };
  };

  // Fetch the first page of 100 comments.
  const { response, populated } = await fetchComments({ postId, page: 1 });
  let rawItems = populated;

  // Get posts and pages count.
  const total = getTotal(response, populated.length);
  const totalPages = getTotalPages(response, 1);

  // Fetch other pages if there are more than one.
  if (totalPages > 1) {
    const otherPages = await Promise.all(
      new Array(totalPages - 1)
        .fill(0)
        .map((_, i) => fetchComments({ postId, page: i }))
    );

    // Add other pages to rawItems.
    rawItems = rawItems.concat(...otherPages.map(({ populated }) => populated));
  }

  const commentsMap: Record<string, CommentItem> = {};
  const items = rawItems
    .map(({ type, id }) => (commentsMap[id] = { type, id }))
    .reduce((root, item) => {
      // Get the parent ID if this comment is a reply.
      const { parent } = state.source[item.type][item.id];

      if (parent !== 0) {
        // Add it to its parent's children list if it is a reply.
        const parentItem = commentsMap[parent];
        parentItem.children = parentItem.children || [];
        parentItem.children.push(item);
      } else {
        // Add it to the root list.
        root.push(item);
      }

      return root;
    }, [] as CommentItem[]);

  // Add data to source.
  const currentPageData = state.source.data[route];

  Object.assign(currentPageData, {
    postId,
    items,
    total,
    totalPages,
    type: "comments",
    isComments: true,
  });
};
