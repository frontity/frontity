import { Package } from "frontity/types";

/**
 * A Frontity starter theme designed to learn Frontity.
 */
interface marsTheme extends Package {
  /**
   * The name of this package.
   */
  name: "@frontity/mars-theme",

  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * In Frontity, any package can add React components to the site.
     * We use roots for that, scoped to the `theme` namespace.
     */
    theme: React.ReactType,
  },

  /**
   * The state exposed by this package.
   */
  state: {
    /**
     * Theme namespace.
     */
    theme: {
      /**
       * The 
       */
      autoPrefetch: "in-view",
      menu: [],
      isMobileMenuOpen: false,
      featured: {
        showOnList: false,
        showOnPost: false,
      },
    },
  },

  /**
   * The actions exposed by this package.
   */
  actions: {
    theme: {
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
    },
  },
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * inside the content HTML. You can add your own processors too.
       */
      processors: [image, iframe],
    },
  },
};
