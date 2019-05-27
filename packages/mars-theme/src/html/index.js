import Theme from "./components/theme";

const marsTheme = {
  name: "@frontity/mars-theme",
  roots: {
    theme: Theme
  },
  state: {
    theme: {
      menu: [["Home", "/"]],
      featured: {
        showOnList: false,
        showOnPost: false
      }
    }
  },
  actions: {
    theme: {
      beforeSSR: async ({ state, actions }) => {
        const { path, page } = state.router;
        await actions.source.fetch({ path, page });
      }
    }
  }
};

export default marsTheme;
