import React from "react";
import Package from "../types";
import { connect } from "frontity";
import { Connect } from "frontity/types";

/**
 * This is a basic test of the wp-comments.
 *
 * @param props - Injected props by {@link connect}.
 * @returns React Element.
 */
const Component: React.FC<Connect<Package>> = ({ actions, state }) => {
  /**
   * Send a test comment.
   */
  const sendComment1 = () => {
    actions.comments.submit(1, {
      content: "Hello world!",
      author_email: "frontibotito@frontity.org",
      author_name: "Michal",
    });
  };

  return (
    <>
      <button id="send-comment" onClick={sendComment1}>
        Comment
      </button>

      <pre id="form"> {JSON.stringify(state.comments.forms[1], null, 2)}</pre>
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
