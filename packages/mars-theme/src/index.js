import Theme from "./components/theme";

const marsTheme = {
  name: "@frontity/mars-theme",
  roots: {
    theme: Theme
  },
  state: {
    theme: {
      menu: [],
      featured: {
        showOnList: false,
        showOnPost: false
      }
    }
  }
};

export default marsTheme;
