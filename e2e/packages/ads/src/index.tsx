import React from "react";
import { Slot, connect, URL } from "frontity";
import { Connect } from "frontity/types";
import TestAds, { Packages } from "../types";

/**
 * Simple component that mocks the homepage.
 *
 * @returns React element.
 */
const Homepage = () => (
  <>
    <h1>Homepage</h1>
    <p>This is the homepage.</p>
  </>
);

/**
 * Simple component that mocks a post.
 *
 * @returns React element.
 */
const Post = () => (
  <>
    <h1>A post</h1>
    <Slot name="content" />
    <p>This is some post</p>
  </>
);

/**
 * Simple component that mocks a post with a GPT ad component.
 *
 * @param props - Frontity props.
 * @returns React element.
 */
const PostWithGPTComponent: React.FC<Connect<Packages>> = ({ libraries }) => {
  const { GooglePublisherTag } = libraries.googleAdManager;

  return (
    <>
      <h1>A post with GPT component</h1>
      <p>Below this paragraph must appear an add.</p>
      <GooglePublisherTag
        id="div-gpt-below-content"
        unit="/6355419/Travel/Europe/France/Paris"
        size={[300, 250]}
      />
    </>
  );
};

const PostWithGPT = connect(PostWithGPTComponent);

/**
 * Simple component that mocks a theme.
 *
 * @param props - Injected props by {@link connect}.
 *
 * @returns React element.
 */
const Theme: React.FC<Connect<Packages>> = ({ state, actions }) => {
  // Get only the pathname (remove query from link).
  const { pathname } = new URL(state.router.link, "http://localhost:3001");

  return (
    <>
      <Slot name="header" />
      {/* Render homepage or post */}
      {pathname === "/" && <Homepage />}
      {pathname === "/post/" && <Post />}
      {pathname === "/post-with-gpt/" && <PostWithGPT />}
      {/* Buttons */}
      <button id="change-link" onClick={() => actions.router.set("/post/")}>
        Go to post
      </button>
      <button
        id="change-link-gpt"
        onClick={() => actions.router.set("/post-with-gpt/")}
      >
        Go to post with GPT
      </button>
      <Slot name="footer" />
    </>
  );
};

const testAds: TestAds = {
  name: "e2e-ads",
  roots: {
    theme: connect(Theme),
  },
  state: {
    source: {
      data: {},
      get: ({ state }) => (link) => state.source.data[link],
    },
  },
  actions: {
    source: {
      fetch: ({ state }) => async (link) => {
        const { data } = state.source;
        if (!data[link]) {
          data[link] = {
            link,
            isFetching: true,
            isReady: false,
          };

          await Promise.resolve();

          data[link] = {
            ...data[link],
            isFetching: false,
            isReady: true,
          };
        }
      },
    },
  },
};

export default testAds;
