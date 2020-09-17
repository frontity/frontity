import React from "react";
import { connect } from "frontity";
import SmartAdserver from "../types";

const Root: React.FC = connect(({ state }) => {
  const data = state.source.get(state.frontity.initialLink);
  return (
    <>
      <div>hello</div>
    </>
  );
});

const wpSourceErrors: SmartAdserver = {
  name: "e2e-wp-comments",
  state: {
    fills: {},
  },
  roots: {
    smartAdserver: Root,
  },
  libraries: {},
};

export default wpSourceErrors;
