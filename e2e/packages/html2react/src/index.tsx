import React from "react";
import { connect } from "frontity";
import { Connect } from "frontity/types";
import Html2ReactTests, { Packages } from "../types";
import html from "./html";
import processors from "./processors";

/**
 * A React component that contains a button to mutate the color of the state,
 * which is used internally by a processor.
 *
 * @param props - The injected store.
 *
 * @returns React element.
 */
const Root: React.FC<Connect<Packages>> = ({ actions, libraries }) => {
  const { Component: Html2React } = libraries.html2react;
  return (
    <>
      <Html2React html={html} />
      <button
        id="change-color"
        onClick={() => actions.html2reactTests.setColor("red")}
      >
        Change color
      </button>
    </>
  );
};

const html2reactTests: Html2ReactTests = {
  state: {
    html2reactTests: {
      color: "blue",
    },
  },
  actions: {
    html2reactTests: {
      setColor: ({ state }) => (color) => {
        state.html2reactTests.color = color;
      },
    },
  },
  roots: {
    html2reactTests: connect(Root),
  },
  libraries: {
    html2react: {
      processors,
    },
  },
};

export default html2reactTests;
