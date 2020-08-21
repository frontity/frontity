import React from "react";
import Package from "../types";

/**
 * This is a basic test.
 *
 * @returns React Element.
 */
const Component: React.FC = () => (
  <>
    <div id="test" className="test">
      hello test
    </div>
  </>
);

const WPCommentsPackage: Package = {
  name: "e2e-wp-comments",
  state: {},
  actions: {},
  roots: {
    testing: Component,
  },
  libraries: {},
};

export default WPCommentsPackage;
