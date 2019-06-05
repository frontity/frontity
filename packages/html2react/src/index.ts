import Html2React from "..";
import Component from "./libraries/html2react";
import parse from "./libraries/parse";
// import Processors from "./libraries/processors";

const html2react = (): Html2React => {
  
  return {
    name: "@frontity/html2react",
    libraries: {
      html2react: {
        processors: [],
        parse,
        Component
      }
    }
  };
};

export default html2react;
