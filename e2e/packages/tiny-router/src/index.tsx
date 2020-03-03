import React from "react";
import Package from "../types";
import { connect } from "frontity";

const Root = connect(({ state, actions }) => {
  return (
    <>
      <button
        data-button-id="switch-to-home"
        onClick={() => {
          actions.router.set("/?name=tiny-router");
        }}
      >
        Home
      </button>

      <button
        data-button-id="switch-to-about"
        onClick={() => {
          actions.router.set("/about/");
        }}
      >
        Page with trailing slash
      </button>

      <button
        data-button-id="switch-to-about-no-trailing"
        onClick={() => {
          actions.router.set("/about");
        }}
      >
        Page without trailing slash
      </button>

      {state.router.link === "/?name=tiny-router" && (
        <div data-test-id="content">Home</div>
      )}

      {state.router.link === "/about/" && (
        <div data-test-id="content">About</div>
      )}
    </>
  );
});

const TinyRouterPackage: Package = {
  name: "tiny-router",
  state: {},
  actions: {},
  roots: {
    tinyRouter: Root
  },
  libraries: {}
};

export default TinyRouterPackage;
