import React from "react";
import { Head, connect } from "frontity";
import { Connect } from "frontity/types";
import Analytics, { Packages } from "../types";

/**
 * Simple component that mocks the homepage.
 *
 * @returns React element.
 */
const Homepage = () => (
  <>
    <Head>
      <title>Homepage Title</title>
    </Head>
    <h1>Homepage</h1>
    <p>This is the homepage.</p>
  </>
);

/**
 * Simple component that mocks a post.
 *
 * @returns React element.
 */
const SomePost = () => (
  <>
    <Head>
      <title>Some Post Title</title>
    </Head>
    <h1>Some post</h1>
    <p>This is some post</p>
  </>
);

/**
 * Simple component that mocks a theme.
 *
 * @param props - Injected props by {@link connect}.
 *
 * @returns React element.
 */
const Theme: React.FC<Connect<Packages>> = ({ state, actions }) => {
  // Get only the pathname (link has query).
  const { pathname } = new URL(state.router.link, "http://localhost:3001");

  return (
    <>
      {/* Render homepage or post */}
      {pathname === "/" && <Homepage />}
      {/* Same component to test the case when the title doesn't change*/}
      {pathname === "/some-post/" && <SomePost />}
      {pathname === "/some-other-post/" && <SomePost />}
      {/* Buttons */}
      <button
        id="change-link"
        onClick={() => actions.router.set("/some-post/")}
      >
        Some Post
      </button>
      <button
        id="change-link-post-2"
        onClick={() => actions.router.set("/some-other-post/")}
      >
        Some Post
      </button>
      <button
        id="send-event"
        onClick={() => actions.analytics.event(state.testAnalytics.testEvent)}
      >
        Send event
      </button>
    </>
  );
};

const analytics: Analytics = {
  name: "e2e-analytics",
  roots: {
    theme: connect(Theme),
  },
  state: {
    source: {
      data: {},
      get: ({ state }) => (link) => state.source.data[link],
    },
    analytics: {
      pageviews: {
        testAnalytics: true,
      },
      events: {
        testAnalytics: true,
      },
    },
    testAnalytics: {
      pageviews: [],
      events: [],
      testEvent: {
        name: "some event",
        payload: { content: "some content" },
      },
    },
  },
  actions: {
    source: {
      fetch: ({ state }) => async (link) => {
        const { data } = state.source;
        if (!data[link]) {
          data[link] = {
            link,
            route: link,
            query: {},
            page: 1,
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
    testAnalytics: {
      pageview: ({ state }) => (pageview) => {
        state.testAnalytics.pageviews.push(pageview);
      },
      event: ({ state }) => (event) => {
        state.testAnalytics.events.push(event);
      },
    },
  },
};

export default analytics;
