import { fetch, warn } from "frontity";
import WpComments from "../types";

const wpComments: WpComments = {
  name: "@frontity/wp-comments",
  actions: {
    comments: {
      create: ({ state }) => async ({
        comment,
        author,
        email,
        url = "",
        postId,
        parentId = 0,
      }) => {
        // Check first if the connected source is a WP.com site.
        if (state.source.isWpCom) {
          return warn(
            "Sending comments to a WordPress.com site is not supported yet."
          );
        }

        // Generate form content.
        const body = new URLSearchParams();
        body.set("comment", comment);
        body.set("author", author);
        body.set("email", email);
        body.set("url", url);
        body.set("comment_post_ID", String(postId));
        body.set("comment_parent", String(parentId));

        // Generate endpoint URL.
        const commentsPost = state.source.api.replace(
          /\/wp-json\/?$/,
          "/wp-comments-post.php"
        );

        // Send a POST request.
        return await fetch(commentsPost, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        });
      },
    },
  },
};

export default wpComments;
