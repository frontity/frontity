import Html2React from "../types";
import Component from "./libraries/component";
import script from "../processors/script";
import links from "../processors/links";

const html2react: Html2React = {
  name: "@frontity/html2react",
  libraries: {
    html2react: {
      processors: [script, links],
      Component,
    },
  },
};

export default html2react;
