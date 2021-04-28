import React from "react";
import { connect, useConnect, css } from "frontity";
import { isArchive, isPostType } from "@frontity/source";
import Archive from "./components/archive";
import PostType from "./components/post-type";
import * as handlers from "./handlers";
import UseInfiniteScroll, { Packages } from "../types";
import { buildLink } from "./utils";
import { PostData, TermData } from "@frontity/source/types";

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
      text-align: right;
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
      actions.router.set(finalLink);
      actions.source.fetch(finalLink);
      window.scrollTo(0, 0);
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
          <button data-test="to-category-two" onClick={goTo("/category/two")}>
            To Category Two
          </button>
          <button data-test="to-first-post" onClick={goTo("/post-1")}>
            To First Post
          </button>
          <button data-test="to-last-post" onClick={goTo("/post-10")}>
            To Last Post
          </button>
          <button data-test="to-some-post" onClick={goTo("/some-post")}>
            To Some Post
          </button>
          <button data-test="to-post-7" onClick={goTo("/post-7")}>
            To Post 7
          </button>
          <button
            data-test="to-post-1-with-query"
            onClick={goTo("/post-1?q=123")}
          >
            To Post 1 with query
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

/**
 * PostData object prepopulated for some test cases.
 */
const postReady: PostData = {
  isFetching: false,
  isReady: true,
  isPostType: true,
  isPost: true,
  id: 7,
  type: "post",
  link: "/post-7/",
  route: "/post-7/",
  page: 1,
  query: {},
};

/**
 * TermData object prepopulated for some test cases.
 */
const categoryReady: TermData = {
  isFetching: false,
  isReady: true,
  isArchive: true,
  isTerm: true,
  id: 2,
  taxonomy: "category",
  link: "/category/two/",
  route: "/category/two/",
  page: 1,
  query: {},
  next: "/category/two/page/2/",
  items: [
    { type: "post", id: 1, link: "post-1" },
    { type: "post", id: 2, link: "post-2" },
    { type: "post", id: 3, link: "post-3" },
    { type: "post", id: 4, link: "post-4" },
    { type: "post", id: 5, link: "post-5" },
    { type: "post", id: 6, link: "post-6" },
    { type: "post", id: 7, link: "post-7" },
    { type: "post", id: 8, link: "post-8" },
    { type: "post", id: 9, link: "post-9" },
    { type: "post", id: 10, link: "post-10" },
  ],
};

const pkg: UseInfiniteScroll = {
  name: "use-infinite-scroll",
  state: {
    theme: {
      isInfiniteScrollEnabled: true,
      infiniteScrollLimit: Infinity,
      infiniteScrollArchive: undefined,
    },
    source: {
      data: {
        "/post-7/": postReady,
        "/category/two/": categoryReady,
      },
      post: {
        7: {
          type: "post",
          id: 7,
          link: "/post-7/",
          slug: "post-7",
        },
      },
      category: {
        2: {
          taxonomy: "category",
          id: 2,
          link: "/category/two/",
          slug: "two",
        },
      },
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
