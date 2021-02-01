import React from "react";
import { connect, useConnect } from "frontity";
import { isArchive, isPostType } from "@frontity/source";
import Archive from "./components/archive";
import PostType from "./components/post-type";
import * as handlers from "./handlers";
import UseInfiniteScroll, { Packages } from "../types";

const Root: React.FC = connect(
  () => {
    const { state, actions } = useConnect<Packages>();
    const data = state.source.get(state.router.link);

    return (
      <>
        {(isArchive(data) && <Archive />) ||
          (isPostType(data) && <PostType />) ||
          ("isTest" in data && (
            <>
              <button
                data-test="to-archive"
                onClick={() => {
                  actions.router.set("/");
                  actions.source.fetch("/");
                }}
              >
                To Archive
              </button>
              <button
                data-test="to-category-one"
                onClick={() => {
                  actions.router.set("/category/one");
                  actions.source.fetch("/category/one");
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
              <button
                data-test="limit-infinite-scroll"
                onClick={() => {
                  actions.theme.limitInfiniteScroll(2);
                }}
              >
                Set Limit
              </button>
              <button
                data-test="set-archive"
                onClick={() => {
                  actions.theme.setInfiniteScrollArchive("/category/one");
                }}
              >
                Set Archive Source
              </button>
              <button
                data-test="set-posts-page"
                onClick={() => {
                  actions.theme.setInfiniteScrollArchive("/blog");
                }}
              >
                Set Posts Page
              </button>
            </>
          ))}
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
      infiniteScrollLimit: Infinity,
      infiniteScrollArchive: undefined,
    },
  },
  actions: {
    theme: {
      toggleInfiniteScroll({ state }) {
        state.theme.isInfiniteScrollEnabled = !state.theme
          .isInfiniteScrollEnabled;
      },
      limitInfiniteScroll: ({ state }) => (value) => {
        state.theme.infiniteScrollLimit = value;
      },
      setInfiniteScrollArchive: ({ state }) => (link) => {
        state.theme.infiniteScrollArchive = link;
      },
      init({ state, libraries }) {
        Object.values(handlers).forEach((handler) => {
          libraries.source.handlers.push(handler);
        });

        // Get some `state.source` options from Frontity options.
        state.source.postsPage = state.frontity.options.postsPage;
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
