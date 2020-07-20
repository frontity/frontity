import Html2React from "../types";
import Component from "./libraries/component";
import script from "../processors/script";
import link from "../processors/link";

const html2react: Html2React = {
  name: "@frontity/html2react",
  libraries: {
    html2react: {
      processors: [script, link],
      Component,
    },
  },
};

export default html2react;
