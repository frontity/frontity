import React from "react";
import { Namespace } from "@frontity/types/namespace";
import loadable from "@loadable/component";

const Dynamic = loadable(() => import("./dynamic2"));

const ThemeStore = {
  state: {
    themeExample: 2
  },
  actions: {
    beforeSSR: ({ state }) => {
      state.theme.themeExample = 3;
    }
  }
};

const CommentsStore = {
  state: {
    commentExample: 2
  }
};

export const theme: Namespace = {
  Root: () => (
    <>
      <div>Hi from Extension example 2!</div>
      <Dynamic />
    </>
  ),
  Fills: () => <div>I am a fill of extension example 2</div>,
  Store: ThemeStore
};

export const comments: Namespace = {
  Components: {
    Comment: () => <div>I am a comment from extension example 2!</div>
  },
  Store: CommentsStore
};
