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
      menu: [],
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
      // Init is a special action run both in the server and the client. It is used
      // to initilize things, usually from other packages.
      init: ({ libraries }) => {
        // In this case, we add a processor to html2react to process the <img> tags
        // inside the content HTML. You can add your own processors too.
        libraries.html2react.processors.push(image);
      }
    }
  }
};

export default marsTheme;
