import React from "react";
import { Slot, connect } from "frontity";
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
    <p>
      Porta non pulvinar neque laoreet suspendisse interdum. In dictum non
      consectetur a erat nam at lectus urna. Turpis egestas sed tempus urna et
      pharetra pharetra massa massa. Est placerat in egestas erat. Habitasse
      platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper
      dignissim. Mi in nulla posuere sollicitudin aliquam ultrices sagittis
      orci. Et tortor at risus viverra adipiscing at in. Velit sed ullamcorper
      morbi tincidunt ornare massa. Elementum tempus egestas sed sed risus
      pretium quam vulputate. Tristique senectus et netus et malesuada fames ac.
      Tincidunt vitae semper quis lectus nulla at volutpat. Vehicula ipsum a
      arcu cursus vitae congue mauris rhoncus. Augue mauris augue neque gravida
      in fermentum et sollicitudin ac. Rhoncus est pellentesque elit
      ullamcorper. Non diam phasellus vestibulum lorem sed risus ultricies.
      Tincidunt arcu non sodales neque. Tortor aliquam nulla facilisi cras
      fermentum odio eu feugiat pretium.
    </p>
  </>
);

/**
 * Simple component that mocks a post.
 *
 * @param props - React props.
 * @returns React element.
 */
const Post = ({
  data,
}: {
  /**
   *Data object.
   */ data?: any;
}) => (
  <>
    <h1>A post</h1>
    <p>This is some post</p>
    <p>
      Porta non pulvinar neque laoreet suspendisse interdum. In dictum non
      consectetur a erat nam at lectus urna. Turpis egestas sed tempus urna et
      pharetra pharetra massa massa. Est placerat in egestas erat. Habitasse
      platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper
      dignissim. Mi in nulla posuere sollicitudin aliquam ultrices sagittis
      orci. Et tortor at risus viverra adipiscing at in. Velit sed ullamcorper
      morbi tincidunt ornare massa. Elementum tempus egestas sed sed risus
      pretium quam vulputate. Tristique senectus et netus et malesuada fames ac.
      Tincidunt vitae semper quis lectus nulla at volutpat. Vehicula ipsum a
      arcu cursus vitae congue mauris rhoncus. Augue mauris augue neque gravida
      in fermentum et sollicitudin ac. Rhoncus est pellentesque elit
      ullamcorper. Non diam phasellus vestibulum lorem sed risus ultricies.
      Tincidunt arcu non sodales neque. Tortor aliquam nulla facilisi cras
      fermentum odio eu feugiat pretium.
    </p>
    <Slot name="content" data={data} />
  </>
);

/**
 * Simple component that mocks a post with a GPT ad component.
 *
 * @param props - Frontity props.
 * @returns React element.
 */
const PostWithGPTComponent: React.FC<Connect<Packages>> = ({ libraries }) => {
  const { GooglePublisherTag } = libraries.fills.googleAdManager;

  return (
    <>
      <h1>A post with GPT component</h1>
      <p>Below this paragraph must appear an add.</p>
      <GooglePublisherTag
        id="post-with-gpt-ad"
        unit="/4595/nfl.test.open"
        size={[300, 250]}
      />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
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
  const data = state.source.get(state.router.link);

  return (
    <>
      <Slot name="header" />
      {/* Render homepage*/}
      {pathname === "/" && <Homepage />}
      {/* Render two posts with different data */}
      {pathname === "/post/" && (
        <>
          <Post data={data} />
          <Post data={{ link: "/next-post/" }} />
        </>
      )}
      {/* Render post that uses GPT directly */}
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
