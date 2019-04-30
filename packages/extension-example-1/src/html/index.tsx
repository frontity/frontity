import React from "react";
import ExtensionExample1 from "../../type";

const ExtensionExample1: ExtensionExample1 = {
  name: "@frontity/extension-example-1",
  state: {
    settings: {
      extension1: {
        setting1: "1"
      }
    },
    extension1: {
      prop1: 1
    },
    comments: {
      prop2: 2
    }
  },
  roots: {
    extension1: () => <div>I am the root of extension example 1!</div>
  },
  fills: {
    extension1: () => <div>I am a fill of extension example 1</div>
  },
  libraries: {
    comments: {
      Comment: () => <div>I am a comment from extension example 1!</div>
    }
  }
};

export default ExtensionExample1;
