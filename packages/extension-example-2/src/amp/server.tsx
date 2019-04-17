import React from "react";
import { Namespace } from "@frontity/types/namespace";

const ThemeStore = {
  state: {
    themeExample: 2
  }
};

const CommentsStore = {
  state: {
    commentExample: 2
  }
};

export const theme: Namespace = {
  Root: () => <div>Hi from AMP in extension example 2!</div>,
  Fills: () => <div>I am a fill of extension example 2</div>,
  Store: ThemeStore
};

export const comments: Namespace = {
  Components: {
    Comment: () => <div>I am a comment from extension example 2!</div>
  },
  Store: CommentsStore
};
