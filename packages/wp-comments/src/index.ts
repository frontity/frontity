import { fetch, warn } from "frontity";
import { commentsHandler } from "./libraries";
import WpComments, { WpCommentError, CommentItem, Packages } from "../types";
import { ResolveState } from "../../types/src/utils";
import { CommentData } from "../../source/types/data";

/**
 * Recursively walk the comment tree and insert the new comment in the correct place.
 * The tree of comments is going to be traversed depth-first.
 *
 * @param items - The array of Comments items that are currently present in the state.
 * @param newItem - The new comment item to be inserted.
 * @param parentId - The ID of the parent comment.
 *
 * @returns The updated items.
 */
const insertItem = (
  items: CommentItem[],
  newItem: CommentItem,
  parentId: number
) => {
  for (const item of items) {
    if (item.children) {
      insertItem(item.children, newItem, parentId);
    }
    if (item.id === parentId) {
      if (item.children) {
        item.children.push(newItem);
      } else {
        item.children = [newItem];
      }
      return items;
    }
  }
  return items;
};

/**
 * Insert the comment into Frontity state.
 *
 * POSTing a new comment ot the REST API returns a newly added comment.
 * This function will add that newly created comment to the state and update
 * any dependant pieces of state, e.g. Increment the total number of comments
 * for a post.
 *
 * @param item - The new comment that should be inserted.
 * @param state - The Frontity state.
 */
export const insertComment = (
  item: CommentItem,
  state: ResolveState<Packages["state"]>
) => {
  // Get the data for the comment.
  // It should be present because we have already `populate()`'d the state previously()`
  const { parent, post } = state.source.comment[item.id];

  // Get the comment data if it exists;
  const commentData = (state.source.data[`@comments/${post}/`] ||
    {}) as CommentData;

  // Check if there already exists any comment for this post.
  if (commentData?.items?.length > 0) {
    let items: CommentItem[] = [];

    // If the comment has a parent, we have to insert it in the correct place
    // in the tree of CommentItems.
    if (parent) {
      items = insertItem(commentData.items, item, parent);
    } else {
      items = commentData.items.concat(item);
    }

    // If the current total === 100, we have to increment the total number
    // of pages by 1 (the per page limit is 100). Otherwise, the total number
    // of pages stays unchanged.
    const totalPagesIncrement = commentData.total % 100 === 0 ? 1 : 0;

    Object.assign(commentData, {
      total: commentData.total + 1,
      totalPages: commentData.totalPages + totalPagesIncrement,
      items,
    });
  } else {
    // This means that it's a new comment so we just create all the new data.
    Object.assign(commentData, {
      postId: post,
      total: 1,
      totalPages: 1,
      items: [item],
      type: "comments",
      isComments: true,
    });
  }
};

const wpComments: WpComments = {
  name: "@frontity/wp-comments",
  state: {
    comments: {
      forms: {},
    },
    source: {
      comment: {},
    },
  },
  libraries: {
    source: {
      handlers: [
        {
          name: "comments",
          priority: 10,
          pattern: "@comments/:postId(\\d+)",
          func: commentsHandler,
        },
      ],
    },
  },
  actions: {
    comments: {
      submit: ({ state, actions, libraries }) => async (postId, comment) => {
        // Return if a submission is pending.
        if (state.comments.forms[postId]?.isSubmitting) {
          return warn(
            "You cannot submit a comment to the same post if another is already pending."
          );
        }

        // Update fields for this form.
        // This line inits the form if it hasn't been initialized yet.
        actions.comments.updateFields(postId, comment || {});

        const form = state.comments.forms[postId];

        // Reset the form status
        form.isError = false;
        form.errorMessage = "";
        form.errorCode = "";
        form.isSubmitting = true;
        form.isSubmitted = false;
        form.errors = {};

        const body = new URLSearchParams();

        /**
         * Set the request URL params.
         *
         * @param param - A URL param to be set on the request to create a comment. The possible arguments are listed in https://developer.wordpress.org/rest-api/reference/comments/#arguments-2.
         * @param value - The value for the param.
         */
        const setBody = (param: string, value: string) => {
          if (value) body.set(param, value);
        };

        // Get fields from the corresponding form.
        const { fields } = form;

        // Generate form content.
        setBody("content", fields?.content);
        setBody("author", fields?.author?.toString());
        setBody("author_name", fields?.authorName);
        setBody("author_email", fields?.authorEmail);
        setBody("author_url", fields?.authorURL);
        setBody("parent", fields?.parent?.toString());
        setBody("post", postId.toString());

        // Generate endpoint URL.
        const commentsPost =
          state.source.api.replace(/\/$/, "") + "/wp/v2/comments";

        // Send a POST request.
        let response: Response;
        try {
          response = await fetch(commentsPost, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body,
          });
        } catch (e) {
          // Network error.
          form.isSubmitting = false;
          form.isError = true;
          form.errorMessage = "Network error";
          return;
        }

        // 201 OK - The comment was posted successfully.
        //
        // No other status should be returned by the WordPress REST API on a
        // successful comment creation, so we can treat any other status as error.
        if (response.status === 201) {
          const populated = await libraries.source.populate({
            response,
            state,
            link: `@comments/${postId}`,
          });

          // There is only one comment inserted at a time, so we can access it with `[0]`
          const { id, type } = populated[0];

          // Insert the comment into the state
          insertComment({ id, type }, state);

          // Reset the form fields
          form.fields = {
            content: "",
          };

          // Reset the form status
          form.isSubmitting = false;
          form.isSubmitted = true;

          return;
        }

        // Handle 4xx errors
        if (response.status >= 400 && response.status < 500) {
          const errorBody: WpCommentError = await response.json();

          form.isSubmitting = false;
          form.isError = true;
          form.errorMessage = errorBody.message;
          form.errorCode = errorBody.code;
          form.errorStatusCode = response.status;
          return;
        }

        // Any other response - Unexpected error.
        form.isSubmitting = false;
        form.isError = true;
        form.errorMessage = `Unexpected error: ${response.statusText}`;
        form.errorStatusCode = response.status;
      },
      updateFields: ({ state }) => (postId, fields) => {
        // Get form from state.
        let form = state.comments.forms[postId];

        // Create it if doesn't exist yet.
        if (!form || !fields) {
          form = state.comments.forms[postId] = {
            fields: {
              content: "",
            },
            isSubmitting: false,
            isSubmitted: false,
            isError: false,
            errors: {},
            errorMessage: "",
            errorCode: "",
          };
        }

        // Assign given fields.
        Object.assign(form.fields, fields || {});
      },
    },
  },
};

export default wpComments;
