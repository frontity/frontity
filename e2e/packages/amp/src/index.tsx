import * as React from "react";
import Package from "../types";
import { connect } from "frontity";

/**
 * A React component to render the test AMP theme.
 *
 * @returns React element.
 */
const Theme = connect(({ state }) => {
  const data = state.source.get(state.router.link);
  return (
    <div id="test">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
});

const AmpPackage: Package = {
  name: "e2e-amp",
  roots: {
    amp: Theme,
  },
  libraries: {
    html2react: {
      processors: [],
    },
  },
};

export default AmpPackage;
