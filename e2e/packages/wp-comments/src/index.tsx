import React from "react";
import Package from "../types";
import { connect } from "frontity";
import { Connect } from "frontity/types";

/**
 * A component that can send comments to the WordPress backend.
 *
 * @param props - Injected props by {@link connect}.
 * @returns React Element.
 */
const Component: React.FC<Connect<Package>> = ({ actions, state }) => {
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

      <pre id="form">
        {JSON.stringify(state.comments.forms[1]?.submitted, null, 2)}
      </pre>
      <pre id="error-message">
        {state.comments.forms[1]?.submitted?.errorMessage}
      </pre>
    </>
  );
};

const WPCommentsPackage: Package = {
  name: "e2e-wp-comments",
  state: {
    comments: { forms: {} },
  },
  roots: {
    wpComments: connect(Component),
  },
  libraries: {},
};

export default WPCommentsPackage;
