import React from "react";
import { set } from "@frontity/tiny-router/src/actions";
import Package from "../types";
import { connect } from "frontity";

const Root = connect(({ state, actions }) => {
  const { pathname } = new URL(state.router.link, "http://localhost:3001");

  return (
    <>
      <button
        onClick={() => {
          actions.router.set("/");
        }}
      >
        Home
      </button>

      <button
        onClick={() => {
          actions.router.set("/a-page.");
        }}
      >
        Page with trailing slash
      </button>

      <button
        onClick={() => {
          actions.router.set("/a-page");
        }}
      >
        Page without trailing slash
      </button>

      {state.router.link === "/" && <div data-test-id="content">The home</div>}
      {state.router.link === "/a-page/" && (
        <div data-test-id="content">One Page</div>
      )}
    </>
  );
});

const TinyRouterPackage = {
  name: "tiny-router",
  state: {
    router: {
      link: "/"
    }
  },
  actions: {
    router: {
      set
    }
  },
  roots: {
    theme: Root
  },
  libraries: {}
};

export default TinyRouterPackage;
