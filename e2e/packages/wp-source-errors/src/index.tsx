import React from "react";
import { connect } from "frontity";
import WpSourceErrors from "../types";

const Root: React.FC = connect(({ state }) => {
  const data = state.source.get(state.frontity.initialLink);
  return (
    <>
      <div data-test-id="is404">is404: {data.is404 ? "true" : "false"}</div>
      <div data-test-id="isError">
        isError: {data.isError ? "true" : "false"}
      </div>
      <div data-test-id="status">error status: {data.errorStatus}</div>
    </>
  );
});

const wpSourceErrors: WpSourceErrors = {
  name: "wp-source-errors",
  state: {},
  actions: {
    wpSourceErrors: {
      init: ({ state, libraries }) => {
        const { path } = libraries.source.parse(state.frontity.initialLink);
        if (path !== "/") {
          state.source.api = `https://httpstat.us/${path}?rest_route=/`;
        } else {
          state.source.api = "https://test.frontity.io/wp-json";
        }
      },
      beforeSSR: ({ state, actions }) => async ctx => {
        await actions.source.fetch(state.frontity.initialLink);
        const data = state.source.get(state.frontity.initialLink);
        if (data.isError) ctx.status = data.errorStatus;
      }
    }
  },
  roots: {
    wpSourceErrors: Root
  },
  libraries: {}
};

export default wpSourceErrors;
