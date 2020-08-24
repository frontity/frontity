import { fetch, warn, URL } from "frontity";
import { commentsHandler } from "./libraries";
import WpComments from "../types";

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
          isPending: true,
          isOnHold: false,
          isApproved: false,
          timestamp: Date.now(),
          ...fields,
        };

        const {
          content,
          author,
          author_name,
          author_email,
          author_url,
          parent,
        } = fields;

        // Generate form content.
        const body = new URLSearchParams();
        body.set("content", content);
        body.set("author", author.toString());
        body.set("author_name", author_name);
        body.set("author_email", author_email);
        body.set("author_url", author_url);
        body.set("parent", parent.toString());
        body.set("post", postId.toString());

        // Generate endpoint URL.
        const commentsPost = state.source.api + "/wp/v2/comments";

        // Send a POST request.
        let response: Response;
        try {
          response = await fetch(commentsPost, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body,
          });
        } catch (e) {
          // Network error.
          form.submitted.isPending = false;
          form.submitted.isError = true;
          form.submitted.errorMessage = "Network error";
          return;
        }

        // 200 OK - The request has failed because the post ID is invalid, name
        //          or email are missing or email has an invalid format.
        if (response.status === 200) {
          // Get first the body content.
          const body = await response.text();

          // Set error properties
          form.submitted.isPending = false;
          form.submitted.isError = true;

          // If the body is empty `postId` is invalid;
          // `author` or `email` are invalid otherwise.
          form.submitted.errorMessage = !body
            ? "The post ID is invalid"
            : "Author or email are empty, or email has an invalid format";

          return;
        }

        // 409 Conflict - The comment was already submitted, is duplicated.
        if (response.status === 409) {
          form.submitted.isPending = false;
          form.submitted.isError = true;
          form.submitted.errorMessage = "The comment was already submitted";
          return;
        }

        // 302 Found - The comment was submitted.
        if (response.status === 302) {
          // We can know if the comment was approved from the returned location.
          const location = new URL(response.headers.get("Location"));

          // Get the comment ID from the hash.
          const id = parseInt(location.hash.match(/#comment-(\d+)/)[1], 10);

          // Check if the comment is unapproved.
          const isOnHold = location.searchParams.has("unapproved");

          form.submitted.isPending = false;
          form.submitted.isOnHold = isOnHold;
          form.submitted.isApproved = !isOnHold;
          form.submitted.id = id;
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
