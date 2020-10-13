import React from "react";
import { useConnect, connect } from "frontity";
import Redirections, { Packages } from "../types";

const Post: React.FC = connect(() => {
  const { state } = useConnect<Packages>();
  const data = state.source.get(state.router.link);
  const post = state.source.post[data.id];
  return <div data-test-id="post">Post: {post.title.rendered}</div>;
});

/**
 * The root component of the package. It's like a mini-theme to know if we are
 * getting data correctly from WordPress.
 *
 * @returns React element.
 */
const Component: React.FC = () => {
  const { state, actions } = useConnect<Packages>();
  const data = state.source.get(state.router.link);

  return (
    <>
      {data.isArchive && (
        <div>
          <button
            id="open-post"
            onClick={() => actions.router.set("/hello-world")}
          >
            open post
          </button>
          Archive:
          {data.items.map(({ link, id }) => (
            <div key={id} data-test-id={id}>
              {link}
            </div>
          ))}
        </div>
      )}
      {data.isPostType && <Post />}
    </>
  );
};

const redirections: Redirections = {
  roots: {
    redirections: connect(Component),
  },
};

export default redirections;
