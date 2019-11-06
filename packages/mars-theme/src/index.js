import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import { canUseDOM } from "./components/use-media-query";

const marsTheme = {
  name: "@frontity/mars-theme",
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
      initialColorMode: "light",
      colors: {
        headerBg: "#1f38c5",
        headerText: "#ffffff",
        bodyText: "#0c112b",
        bodyBg: "rgba(66,174,228,0.1)",
        // nested color modes to support multiple color modes
        modes: {
          dark: {
            headerBg: "#3c4b9e",
            headerText: "#ffffff",
            bodyText: "rgba(255, 255, 255, 0.9)",
            bodyBg: "rgba(0, 0, 0, 0.9)"
          }
        }
      },
      menu: [],
      isMenuOpen: false,
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
      afterCSR: ({ state }) => {
        // Attempt to get the color mode stored in local storage
        const colorMode = window.localStorage.getItem("color-mode");
        // if color mode doesn't exists, set it to the initial mode in state
        if (!colorMode) {
          window.localStorage.setItem(
            "color-mode",
            state.theme.initialColorMode
          );
        }
      },
      toggleMenu: ({ state }) => {
        state.theme.isMenuOpen = !state.theme.isMenuOpen;

        // block body scroll if menu is open (SSR friendly)
        if (canUseDOM) {
          window.document.body.classList.toggle("menu-open");
        }
      },
      closeMenu: ({ state }) => {
        state.theme.isMenuOpen = false;

        if (canUseDOM) {
          window.document.body.classList.remove("menu-open");
        }
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
