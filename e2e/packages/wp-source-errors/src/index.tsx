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
        const { query } = libraries.source.parse(state.frontity.initialLink);
        if (query.statusCode) {
          // This is a simple app made on glitch.me which just returns the HTTP status code passed as param.
          state.source.api = `https://ballistic-western-donkey.glitch.me/status/${query.statusCode}?rest_route=/`;
        } else {
          state.source.api = "https://test.frontity.org/wp-json";
        }
      },
    },
  },
  roots: {
    wpSourceErrors: Root,
  },
  libraries: {},
};

export default wpSourceErrors;
