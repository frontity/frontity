import React from "react";
import { Namespace } from "@frontity/types/namespace";

const Extension1Store = {
  state: {
    themeExample: 1
  }
};

const CommentsStore = {
  state: {
    commentExample: 1
  }
};

export const extension1: Namespace = {
  Root: () => <div>Hi from Extension example 1!</div>,
  Fills: () => <div>I am a fill of extension example 1</div>,
  Store: Extension1Store
};

export const comments: Namespace = {
  Components: {
    Comment: () => <div>I am a comment from extension example 1!</div>
  },
  Store: CommentsStore
};
