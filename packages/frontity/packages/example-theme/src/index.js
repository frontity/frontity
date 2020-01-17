import React from "react";

const Root = () => {
  return (
    <>
      You can edit your package in:
      <pre>packages/example-theme/src/index.js</pre>
    </>
  );
};

export default {
  name: "example-theme",
  roots: {
    theme: Root
  },
  state: {
    theme: {}
  },
  actions: {
    theme: {}
  }
};
