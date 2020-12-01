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
          <button
            id="307-redirection"
            onClick={() => actions.router.set("/hello-world-307")}
          >
            307 redirection
          </button>
          <button
            id="308-redirection"
            onClick={() => actions.router.set("/hello-world-308")}
          >
            308 redirection
          </button>
          <button
            id="should-preserve-query"
            onClick={() => actions.router.set("/should-preserve-query")}
          >
            ignore and pass params to target
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

const redirectionData = {
  isRedirection: true,
  is301: true,
  redirectionStatus: 301,
  page: 1,
  link: "/redirected-url/",
  isFetching: false,
  isReady: true,
  query: {},
  route: "/redirected-url/",
  location: "/hello-world-redirected/",
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

        const handler = {
          pattern: "/urls-with-redirections/:slug",
          func: ({ state, link }) => {
            state.source.data[link] = redirectionData;
          },
        };

        libraries.source.handlers.push(handler);
      },
    },
  },
  state: {
    source: {
      data: {
        "/redirected-url/": redirectionData,
      },
    },
  },
};

export default redirections;
