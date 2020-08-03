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
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <p>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
      fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
      sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
      amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
      incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad
      minima veniam, quis nostrum exercitationem ullam corporis suscipit
      laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
      iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae
      consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
    </p>
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
        id="div-gpt-below-content"
        unit="/4595/nfl.test.open"
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
      {/* Render homepage*/}
      {pathname === "/" && <Homepage />}
      {/* Render two posts with different data */}
      {pathname === "/post/" && (
        <>
          <Post />
          <Post data={{ link: "/next-post/" }} />
        </>
      )}
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
