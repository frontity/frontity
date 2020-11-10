import React from "react";
import TestComments, { Packages } from "../types";
import { connect } from "frontity";
import { Connect } from "frontity/types";

/**
 * A component that can send comments to the WordPress backend.
 *
 * @param props - Injected props by {@link connect}.
 * @returns React Element.
 */
const Component: React.FC<Connect<Packages>> = ({ actions, state }) => {
  /**
   * Send a correct test comment.
   */
  const sendComment = () => {
    actions.comments.submit(1, {
      content: "Hello world!",
      authorEmail: "frontibotito@frontity.com",
      authorName: "Frontitbotito",
    });
  };

  /**
   * Send a sub-comment for a parent comment that exists by default.
   */
  const sendSubComment = () => {
    actions.comments.submit(1, {
      content: "Hello world!",
      authorEmail: "frontibotito@frontity.com",
      authorName: "Frontitbotito",
      parent: 2, // The ID of the parent comment
    });
  };

  /**
   * Send a comment with a non-existing ID.
   */
  const sendCommentWrongId = () => {
    actions.comments.submit(9999, {
      content: "Hello world!",
      authorEmail: "frontibotito@frontity.com",
      authorName: "Frontitbotito",
    });
  };

  /**
   * Send a comment without an email.
   */
  const sendCommentNoEmail = () => {
    actions.comments.submit(1, {
      content: "Hello world!",
      authorEmail: "",
      authorName: "Frontitbotito",
    });
  };

  /**
   * Fetch all the comments.
   */
  const fetchComments = () => {
    actions.source.fetch(`@comments/1`, { force: true });
  };

  return (
    <>
      <button id="comment-ok" onClick={sendComment}>
        Send correct comment
      </button>
      <button id="comment-wrong-id" onClick={sendCommentWrongId}>
        comment with a wrong ID
      </button>
      <button id="comment-no-email" onClick={sendCommentNoEmail}>
        comment with no email
      </button>
      <button id="sub-comment" onClick={sendSubComment}>
        sub-comment
      </button>

      <button id="fetch-comments" onClick={fetchComments}>
        fetch comments
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          actions.comments.submit(1);
        }}
      >
        <input
          name="content"
          type="text"
          placeholder="content"
          onChange={(e) =>
            actions.comments.updateFields(1, { content: e.target.value })
          }
          value={state.comments.forms[1]?.fields?.content || ""}
        />
        <input
          name="author_name"
          type="text"
          placeholder="author_name"
          onChange={(e) =>
            actions.comments.updateFields(1, { authorName: e.target.value })
          }
          value={state.comments.forms[1]?.fields?.authorName || ""}
        />
        <input
          name="author_email"
          type="text"
          placeholder="author_email"
          onChange={(e) =>
            actions.comments.updateFields(1, { authorEmail: e.target.value })
          }
          value={state.comments.forms[1]?.fields?.authorEmail || ""}
        />
        <input
          name="parent"
          type="number"
          placeholder="parent"
          onChange={(e) =>
            actions.comments.updateFields(1, {
              parent: parseInt(e.target.value, 10),
            })
          }
          value={state.comments.forms[1]?.fields?.parent || 0}
        />

        <input type="submit" />
      </form>
      <style>
        {`pre { 
            background-color: lightgrey;
            padding: 5px;
            margin: 3px;
          }`}
      </style>

      <div style={{ display: "flex", flexFlow: "row nowrap" }}>
        <div>
          <h5>state.comments.form</h5>
          <pre id="form">
            {JSON.stringify(state.comments.forms[1], null, 2)}
          </pre>
        </div>
        <div>
          <h5>state.source.data</h5>
          <pre id="source">
            {JSON.stringify(state.source.data[`@comments/1/`], null, 2)}
          </pre>
        </div>

        <div>
          <h5>state.source.comment</h5>
          <pre id="source">{JSON.stringify(state.source.comment, null, 2)}</pre>
        </div>
      </div>
    </>
  );
};

const WPCommentsPackage: TestComments = {
  name: "e2e-wp-comments",
  roots: {
    wpComments: connect(Component),
  },
};

export default WPCommentsPackage;
