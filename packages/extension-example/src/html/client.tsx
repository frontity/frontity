const ThemeStore = {
  state: {
    themeProp: 1
  }
};

const CommentsStore = {
  state: {
    commentProp: 2
  }
};

const theme = {
  root: <div>Hi from Theme!</div>, // This is the same than our old default export.
  fills: <div>I am a fill</div>, // This are the fills, separated from the root.
  Store: ThemeStore // This is the Overmind store, just like our old MST store.
};

// This theme has its own comments package.
const comments = {
  components: <div>I am a comment!</div>, // Components to be used by other extensions
  Store: CommentsStore
};

// Export namespaces
export default {
  theme,
  comments
};
