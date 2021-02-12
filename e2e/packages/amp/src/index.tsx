import * as React from "react";
import Package from "../types";
import { connect } from "frontity";

/**
 * A React component to render the test AMP theme.
 *
 * @returns React element.
 */
const Theme = connect(({ state, libraries }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const Html2React = libraries.html2react.Component;

  return (
    <div id="test">
      <h2>
        <Html2React html={post.title.rendered} />
      </h2>
      <div>
        <Html2React html={post.content.rendered} />
      </div>
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
