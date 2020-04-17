import React from "react";
import {
  Root as Analytics,
  sendPageview,
  sendEvent,
} from "@frontity/analytics";
import { Head, connect, URL } from "frontity";
import Package from "../types";

const Homepage = () => (
  <>
    <Head>
      <title>Homepage</title>
    </Head>
    <h1>Homepage</h1>
    <p>This is the homepage.</p>
  </>
);

const SomePost = () => (
  <>
    <Head>
      <title>Some post</title>
    </Head>
    <h1>Some post</h1>
    <p>This is some post</p>
  </>
);

const Theme = connect(({ state, actions }) => {
  const { pathname } = new URL(state.router.link, "http://localhost:3001");

  const changeLink = () => actions.router.set("/some-post/");
  const sendEvent = () => actions.analytics.sendEvent({ some: "content" });

  return (
    <>
      {/* Render homepage or post */}
      {pathname === "/" && <Homepage />}
      {pathname === "/some-post/" && <SomePost />}
      {/* Buttons */}
      <button id="change-link" onClick={changeLink}>
        Some Post
      </button>
      <button id="send-event" onClick={sendEvent}>
        Send event
      </button>
    </>
  );
});

const testPackage: Package = {
  name: "analytics",
  state: {
    analytics: {
      namespaces: {},
    },
  },
  actions: {
    analytics: {
      // These actions could be mocked here.
      sendPageview,
      sendEvent,
    },
  },
  roots: {
    theme: Theme,
    analytics: Analytics,
  },
};

export default testPackage;
