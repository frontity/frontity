import React from "react";
import { connect, useConnect, css } from "frontity";
import { isArchive, isPostType } from "@frontity/source";
import Archive from "./components/archive";
import PostType from "./components/post-type";
import * as handlers from "./handlers";
import UseInfiniteScroll, { Packages } from "../types";
import { buildLink } from "./utils";

const Root: React.FC = connect(
  () => {
    const { state, actions } = useConnect<Packages>();
    const data = state.source.get(state.router.link);
    const subdir = state.source.subdirectory;

    /**
     * Styles for the buttons container. This makes the buttons to be always
     * visible, so Cypress doesn't change the scroll position when clicking any
     * of them.
     */
    const buttons = css`
      position: fixed;
      z-index: 10;
      right: 0;
    `;

    /**
     * Return a function to fetch and go to the specified link. It also prepends
     * `state.source.subdirectory` if needed.
     *
     * @param link - Link to visit.
     * @returns A function.
     */
    const goTo = (link: string) => () => {
      const finalLink = buildLink(subdir, link);
      window.scrollTo(0, 0);
      actions.router.set(finalLink);
      actions.source.fetch(finalLink);
    };

    return (
      <>
        <div css={buttons}>
          <button data-test="to-archive" onClick={goTo("/")}>
            To Archive
          </button>
          <button data-test="to-category-one" onClick={goTo("/category/one")}>
            To Category One
          </button>
          <button data-test="to-first-post" onClick={goTo("/post-1")}>
            To First Post
          </button>
          <button data-test="to-last-post" onClick={goTo("/post-10")}>
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
              actions.theme.setInfiniteScrollArchive(
                buildLink(subdir, "/category/one")
              );
            }}
          >
            Set Archive Source
          </button>
        </div>
        {(isArchive(data) && <Archive />) || (isPostType(data) && <PostType />)}
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
        const { postsPage, subdirectory } = state.frontity.options;
        if (postsPage) state.source.postsPage = postsPage;
        if (subdirectory) state.source.subdirectory = subdirectory;
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
