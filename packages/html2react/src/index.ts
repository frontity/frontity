import Html2React from "..";
import Component from "./libraries/html2react";
import parse from "./libraries/parse";
import processors from "./processors";

const html2react = (): Html2React => {
  return {
    name: "@frontity/html2react",
    libraries: {
      html2react: {
        processors: [...processors],
        parse,
        Component
      }
    }
  };
};

export default html2react;
