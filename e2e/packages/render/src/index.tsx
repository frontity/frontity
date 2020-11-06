import React from "react";
import Render, { Packages } from "../types";
import { connect, useConnect } from "frontity";
import { isPost } from "@frontity/source";

let counter = 0;

const Counter = connect(() => {
  const { state } = useConnect<Packages>();

  // Subscribe to the current data object.
  state.source.get(state.router.link);

  // Add 1 to the counter each time this component rerenders.
  counter += 1;

  return (
    <>
      <div>{counter}</div>
      <Theme />
    </>
  );
});

const Theme = connect(() => {
  const { state, actions } = useConnect<Packages>();
  const data = state.source.get(state.router.link);

  return (
    <>
      <button
        data-button-id="go-to-post-1"
        onClick={() => {
          actions.router.set("/post-1/");
        }}
      >
        Go to post 1
      </button>
      {isPost(data) && <div data-test-id="content">Post 1</div>}
    </>
  );
});

const render: Render = {
  state: {
    source: {
      data: {
        "/": {
          isReady: true,
          isHome: true,
        },
      },
    },
  },
  roots: {
    render: Counter,
  },
  libraries: {},
};

export default render;
