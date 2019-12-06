import Theme from "./components";
import image from "@frontity/html2react/processors/image";

const marsTheme = {
  name: "@frontity/twenty-twenty-theme",
  roots: {
    /**
     *  In Frontity, any package can add React components to the site.
     *  We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      menu: [],
      isMobileMenuOpen: true,
      isSearchModalOpen: false,
      featured: {
        showOnList: false,
        showOnPost: false
      }
    }
  },
  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
      },
      performSearch: searchString => ({ state }) => {
        // const backupState = state;
        console.log(searchString);
        console.log(state.source);
      },
      toggleSearchModal: ({ state }) => {
        state.theme.isSearchModalOpen = !state.theme.isSearchModalOpen;
      }
    }
  },
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * inside the content HTML. You can add your own processors too
       */
      processors: [image]
    }
  }
};

export default marsTheme;
