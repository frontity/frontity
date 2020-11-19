import React, { useEffect } from "react";
import { useConnect, connect } from "frontity";
import Redirections, { Packages } from "../types";
import { isArchive, isPostType, isPost } from "@frontity/source";

const Post: React.FC = connect(() => {
  const { state, actions } = useConnect<Packages>();

  useEffect(() => {
    if (state.router.link === "/post-with-prefetch/") {
      actions.source.fetch("/hello-world/");
    }
  }, [state.router.link, actions.source]);

  const data = state.source.get(state.router.link);
  const post = isPost(data) && state.source.post[data.id];
  return <div id="post">Post: {post.title.rendered}</div>;
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
      {isArchive(data) && (
        <div>
          <button
            id="open-post"
            onClick={() => actions.router.set("/hello-world")}
          >
            open post
          </button>
          <button
            id="doubly-redirected"
            onClick={() => actions.router.set("/initial-url")}
          >
            doubly redirected post
          </button>
          <button
            id="302-redirection"
            onClick={() => actions.router.set("/hello-world-302")}
          >
            302 redirection
          </button>
          Archive:
          {data.items.map(({ link, id }) => (
            <div key={id} data-test-id={id}>
              {link}
            </div>
          ))}
        </div>
      )}
      {isPostType(data) && <Post />}
    </>
  );
};

const redirections: Redirections = {
  roots: {
    redirections: connect(Component),
  },
  actions: {
    redirections: {
      init: ({ state, libraries }) => {
        const { query } = libraries.source.parse(state.frontity.initialLink);
        if (query.redirections) {
          state.source.redirections = query.redirections;
        }
      },
    },
  },
};

export default redirections;
