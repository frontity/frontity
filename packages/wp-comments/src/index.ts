import { fetch, warn } from "frontity";
import { commentsHandler } from "./libraries";
import WpComments, { WpCommentError } from "../types";

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
        // Return if a submission is pending.
        if (state.comments.forms[postId]?.isSubmitting) {
          return warn(
            "You cannot submit a comment to the same post if another is already pending."
          );
        }

        // Update fields for this form.
        // This line inits the form if it hasn't been initialized yet.
        actions.comments.updateFields(postId, comment || {});

        // Reset the form.
        const form = state.comments.forms[postId];

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

        // 200 OK - The comment was posted successfully
        if (response.status === 201) {
          // Get first the body content.
          // const body: WpComment = await response.json();

          // Get the comment ID from the hash.
          // const { id, status } = body;

          form.isSubmitting = false;
          form.isSubmitted = true;

          // TODO: Add the comment to state.source comments.
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
