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
  }
};

export default marsTheme;
