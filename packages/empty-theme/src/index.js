import React from "react";

const Theme = () => (
  <div>
    You can edit your theme in <code>src/index.js</code>
  </div>
);

const EmptyTheme = {
  name: "@frontity/empty-theme",
  roots: {
    theme: Theme
  },
  state: {
    // Add here your state.
    theme: {}
  },
  actons: {
    // Add here your actions.
    theme: {}
  }
};

export default EmptyTheme;
