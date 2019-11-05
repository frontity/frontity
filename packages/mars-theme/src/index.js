import Theme from "./components";
import image from "@frontity/html2react/processors/image";

const marsTheme = {
  name: "@frontity/mars-theme",
  roots: {
    // In Frontity, any package can add React components to the site.
    // We use roots for that, scoped to the "theme" namespace.
    theme: Theme
  },
  state: {
    // State is where the packages store their default settings and other
    // relevant state. It is scoped to the "theme" namespace.
    theme: {
      menu: {
        isOpen: false,
        links: []
      },
      featured: {
        showOnList: false,
        showOnPost: false
      }
    }
  },
  // Actions are functions that modify the state or deal with other parts of
  // Frontity like libraries.
  actions: {
    theme: {
      menu: {
        toggle: ({ state }) => {
          state.theme.menu.isOpen = !state.theme.menu.isOpen;
        }
      }
    }
  },
  libraries: {
    html2react: {
      // Add a processor to html2react so it processes the <img> tags
      // inside the content HTML. You can add your own processors too.
      processors: [image]
    }
  }
};

export default marsTheme;
