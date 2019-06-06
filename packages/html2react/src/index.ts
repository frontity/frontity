import Html2React from "..";
import Component from "./libraries/html2react";
import parse from "./libraries/parse";

const html2react = (): Html2React => {
  return {
    name: "@frontity/html2react",
    libraries: {
      html2react: {
        parse,
        processors: [],
        Component
      }
    }
  };
};

export default html2react;
