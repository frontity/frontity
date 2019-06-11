import Theme from "./components/theme";
import processors from "./processors";

const before = ({ libraries }) => {
  libraries.html2react.processors = libraries.html2react.processors.concat(
    processors
  );
};

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
  },
  actions: {
    theme: {
      beforeSSR: before,
      beforeCSR: before
    }
  }
};

export default marsTheme;
