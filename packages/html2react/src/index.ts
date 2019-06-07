import Html2React from "..";
import Component from "./libraries/html2react";
import parse from "./libraries/parse";
import { Processor } from "../types";

const html2react = (): Html2React => {
  const processors: Processor[] = [];
  // const oldPush = processors.push.bind(processors);
  // processors.push = processor => {
  //   oldPush(processor);
  //   processors = processors.sort((a, b) => (a.priority || 10) - (b.priority || 10));
  // });

  return {
    name: "@frontity/html2react",
    libraries: {
      html2react: {
        parse,
        processors,
        Component
      }
    }
  };
};

export default html2react;
