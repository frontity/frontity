import * as React from "react";
import { connect } from "frontity";
import { Connect } from "frontity/types";
import { isError } from "@frontity/source";
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
  return (
    <>
      <div data-test-id="is404">
        is404: {isError(data) && data.is404 ? "true" : "false"}
      </div>
      <div data-test-id="isError">
        isError: {isError(data) ? "true" : "false"}
      </div>
      <div data-test-id="status">
        error status: {isError(data) && data.errorStatus}
      </div>
    </>
  );
};

const wpSourceErrors: WpSourceErrors = {
  name: "e2e-wp-source-errors",
  actions: {
    wpSourceErrors: {
      init: ({ state, libraries }) => {
        const { query } = libraries.source.parse(state.frontity.initialLink);
        if (query.statusCode) {
          // Simple endpoint that returns the HTTP status code specified and
          // ignore the rest of the pathname. Added with a PHP snippet.
          state.source.api = `http://localhost:8080/wp-json/status/v1/${query.statusCode}/`;
        } else {
          state.source.api = "http://localhost:8080/wp-json";
        }
      },
    },
  },
  roots: {
    wpSourceErrors: connect(Root),
  },
};

export default wpSourceErrors;
