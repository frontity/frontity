const ThemeStore = {
  state: {
    themeExample: 1
  }
};

const CommentsStore = {
  state: {
    commentExample: 1
  }
};

export const extension1 = {
  Root: () => <div>Hi from Extension example 1!</div>,
  Fills: () => <div>I am a fill of extension example 1</div>,
  Store: ThemeStore
};

export const comments = {
  Components: () => <div>I am a comment from extension example 1!</div>,
  Store: CommentsStore
};
