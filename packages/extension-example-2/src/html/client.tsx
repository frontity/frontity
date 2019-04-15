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

export const theme = {
  Root: () => <div>Hi from Extension example 2!</div>,
  Fills: () => <div>I am a fill of extension example 2</div>,
  Store: ThemeStore
};

export const comments = {
  Components: () => <div>I am a comment from extension example 2!</div>,
  Store: CommentsStore
};
