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

const theme = {
  root: () => <div>Hi from Extension example 1!</div>,
  fills: () => <div>I am a fill of extension example 1</div>,
  Store: ThemeStore
};

const comments = {
  components: () => <div>I am a comment from extension example 1!</div>,
  Store: CommentsStore
};

// Export namespaces
export default {
  theme,
  comments
};
