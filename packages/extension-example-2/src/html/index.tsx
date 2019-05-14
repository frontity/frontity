import React from "react";
import { loadable } from "frontity";
import Package from "../..";

const Dynamic = loadable(() => import("./dynamic2"));

const ExtensionExample2: Package = {
  name: "@frontity/extension-example-2",
  state: {
    theme: {
      prop1: 1
    },
    comments: {
      prop2: 2
    }
  },
  actions: {
    theme: {}
  },
  roots: {
    theme: () => (
      <>
        <div>Hi from theme of extension example 2!</div>
        <Dynamic />
      </>
    )
  },
  fills: {
    theme: () => <div>I am a fill of extension example 2</div>
  },
  libraries: {
    comments: {
      Comment: () => <div>I am a comment from extension example 2!</div>
    }
  }
};

export default ExtensionExample2;
