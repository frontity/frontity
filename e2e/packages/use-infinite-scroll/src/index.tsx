import React from "react";
import { connect, useConnect } from "frontity";
import Archive from "./components/archive";
import PostType from "./components/post-type";
import * as handlers from "./handlers";
import UseInfiniteScroll, { Packages } from "../types";

const Root: React.FC = connect(
  () => {
    const { state, actions } = useConnect<Packages>();

    return (
      <>
        {(state.router.link.startsWith("/archive") && <Archive />) ||
          (state.router.link.startsWith("/post") && <PostType />) || (
            <>
              <button
                data-test="to-archive"
                onClick={() => {
                  actions.router.set("/archive");
                  actions.source.fetch("/archive");
                }}
              >
                To Archive
              </button>
              <button
                data-test="to-first-post"
                onClick={() => {
                  actions.router.set("/post-1");
                  actions.source.fetch("/post-1");
                }}
              >
                To First Post
              </button>
              <button
                data-test="to-last-post"
                onClick={() => {
                  actions.router.set("/post-10");
                  actions.source.fetch("/post-10");
                }}
              >
                To Last Post
              </button>
              <button
                data-test="toggle-infinite-scroll"
                onClick={() => {
                  actions.theme.toggleInfiniteScroll();
                }}
              >
                Toggle Infinite Scroll
              </button>
            </>
          )}
      </>
    );
  },
  { injectProps: false }
);

const pkg: UseInfiniteScroll = {
  name: "use-infinite-scroll",
  state: {
    theme: {
      isInfiniteScrollEnabled: true,
    },
  },
  actions: {
    theme: {
      toggleInfiniteScroll({ state }) {
        state.theme.isInfiniteScrollEnabled = !state.theme
          .isInfiniteScrollEnabled;
      },
      init({ libraries }) {
        Object.values(handlers).forEach((handler) => {
          libraries.source.handlers.push(handler);
        });
      },
      beforeSSR({ state, actions }) {
        return async () => {
          if (state.router.link !== "/?name=use-infinite-scroll") {
            await actions.source.fetch(state.router.link);
          }
        };
      },
    },
  },
  roots: {
    theme: Root,
  },
  libraries: {},
};

export default pkg;
