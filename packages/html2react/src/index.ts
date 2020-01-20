import Html2React from "../types";
import Component from "./libraries/component";
import parse from "./libraries/parse";
import script from "../processors/script";

const html2react: Html2React = {
  name: "@frontity/html2react",
  libraries: {
    html2react: {
      parse,
      decode: text => text,
      processors: [script],
      Component
    }
  }
};

export default html2react;
