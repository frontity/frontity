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

const theme = {
  root: () => <div>Hi from Extension example 2!</div>,
  fills: () => <div>I am a fill of extension example 2</div>,
  Store: ThemeStore
};

const comments = {
  components: () => <div>I am a comment from extension example 2!</div>,
  Store: CommentsStore
};

// Export namespaces
export default {
  theme,
  comments
};
