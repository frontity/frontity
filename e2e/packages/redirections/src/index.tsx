import React, { useEffect } from "react";
import { useConnect, connect } from "frontity";
import Redirections, { Packages } from "../types";
import { isArchive, isPostType, isPost, isError } from "@frontity/source";
import { RedirectionData } from "@frontity/source/types";

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

const LinkCounter = connect(() => {
  const { state } = useConnect<Packages>();
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    // Add 1 to the counter each time the link changes.
    setCount((count) => count + 1);
  }, [state.router.link]);

  return <div id="link-counter">Number of link changes: {count}</div>;
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
      <LinkCounter />

      <button id="open-post" onClick={() => actions.router.set("/hello-world")}>
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
        onClick={() => actions.router.set("/should-preserve-query?a=1&b=2")}
      >
        ignore and pass params to target
      </button>

      <button
        id="redirection-stored-in-state"
        onClick={() => actions.router.set("/redirected-url/")}
      >
        redirection stored in state
      </button>

      <button
        id="redirection-in-handler"
        onClick={() => actions.router.set("/urls-with-redirections/test/")}
      >
        redirection created by a handler
      </button>

      <button
        id="external-redirection"
        onClick={() => actions.router.set("/external-redirect/")}
      >
        external redirection
      </button>

      {isArchive(data) && (
        <div id="archive">
          Archive:
          {data.items.map(({ link, id }) => (
            <div key={id} data-test-id={id}>
              {link}
            </div>
          ))}
        </div>
      )}
      {isPostType(data) && <Post />}
      {isError(data) && <div id="404">404</div>}
    </>
  );
};

const redirectionData: RedirectionData = {
  isRedirection: true,
  is301: true,
  isExternal: false,
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
          func: async ({ state, link }) => {
            await new Promise((resolve) => setTimeout(resolve, 3000));
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
