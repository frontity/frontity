import { fetch, warn } from "frontity";
import { commentsHandler } from "./libraries";
import WpComments, { WpComment, WpCommentError } from "../types";

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
      submit: ({ state, actions }) => async (postId, comment) => {
        // Check first if the connected source is a WP.com site.
        if (state.source.isWpCom) {
          return warn(
            "Sending comments to a WordPress.com site is not supported yet."
          );
        }

        // Return if a submission is pending.
        if (state.comments.forms[postId]?.submitted?.isPending) {
          return warn(
            "You cannot submit a comment to the same post if another is already pending."
          );
        }

        // Update fields for this form.
        // This line inits the form if it wasn't yet.
        actions.comments.updateFields(postId, comment || {});

        // Get fields from the corresponding form.
        const form = state.comments.forms[postId];
        const { fields } = form;

        // Reset the `submitted` object.
        form.submitted = {
          isError: false,
          errorMessage: "",
          errorCode: "",
          isPending: true,
          isOnHold: false,
          isApproved: false,
          timestamp: Date.now(),
          ...fields,
        };

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
          form.submitted.isPending = false;
          form.submitted.isError = true;
          form.submitted.errorMessage = "Network error";
          return;
        }

        // 200 OK - The comment was posted successfully
        if (response.status === 201) {
          // Get first the body content.
          const body: WpComment = await response.json();

          // Get the comment ID from the hash.
          const { id, status } = body;

          // Check if the comment is unapproved.
          const isOnHold = status === "hold";

          form.submitted.isPending = false;
          form.submitted.isOnHold = isOnHold;
          form.submitted.isApproved = !isOnHold;
          form.submitted.id = id;
          return;
        }

        // Handle 4xx errors
        if (response.status >= 400 && response.status < 500) {
          const errorBody: WpCommentError = await response.json();

          form.submitted.isPending = false;
          form.submitted.isError = true;
          form.submitted.errorMessage = errorBody.message;
          form.submitted.errorCode = errorBody.code;
          return;
        }

        // Any other response - Unexpected error.
        form.submitted.isPending = false;
        form.submitted.isError = true;
        form.submitted.errorMessage = `Unexpected error: ${response.status}`;
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
          };
        }

        // Assign given fields.
        Object.assign(form.fields, fields || {});
      },
    },
  },
};

export default wpComments;
