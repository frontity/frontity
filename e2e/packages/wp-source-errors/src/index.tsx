import React from "react";
import { connect } from "frontity";
import { Connect } from "frontity/types";
import WpSourceErrors, { Packages } from "../types";

/**
 * A React component that shows if there's been an error in the request.
 *
 * @param props - The store injected by `connect`.
 *
 * @returns React Element.
 */
const Root: React.FC<Connect<Packages>> = ({ state }) => {
  const data = state.source.get(state.frontity.initialLink);

  if (data.isError)
    return (
      <>
        <div data-test-id="is404">is404: {data.is404 ? "true" : "false"}</div>
        <div data-test-id="isError">
          isError: {data.isError ? "true" : "false"}
        </div>
        <div data-test-id="status">error status: {data.errorStatus}</div>
      </>
    );

  return null;
};

const wpSourceErrors: WpSourceErrors = {
  actions: {
    wpSourceErrors: {
      init: ({ state, libraries }) => {
        const { query } = libraries.source.parse(state.frontity.initialLink);
        if (query.statusCode) {
          state.source.api = `http://httpstat.us/${query.statusCode}?rest_route=/`;
        } else {
          state.source.api = "https://test.frontity.org/wp-json";
        }
      },
    },
  },
  roots: {
    wpSourceErrors: connect(Root),
  },
};

export default wpSourceErrors;
