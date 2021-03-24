import Html2React from "../types";
import Component from "./libraries/component";
import parse from "./libraries/parse/himalaya-parser";
import script from "../processors/script";

const html2react: Html2React = {
  name: "@frontity/html2react",
  libraries: {
    html2react: {
      processors: [script],
      Component,
      parse,
    },
  },
};

export default html2react;
