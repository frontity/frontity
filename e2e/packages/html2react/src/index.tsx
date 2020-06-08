import React from "react";
import { connect } from "frontity";
import { Connect } from "frontity/types";
import Html2ReactTests from "../types";
import html from "./html";
import processors from "./processors";

const Root: React.FC<Connect<Html2ReactTests>> = ({ actions, libraries }) => {
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
  name: "e2e-html2react",
  state: {
    html2reactTests: {
      color: "blue",
    },
  },
  actions: {
    html2reactTests: {
      setColor: ({ state }) => (color: string) => {
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
