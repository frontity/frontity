import { Package, Action } from "frontity/types";
import { AutoPrefetch } from "@frontity/components/link/types";
import Html2React from "@frontity/html2react/types";

/**
 * A Frontity starter theme designed to learn Frontity.
 */
interface MarsTheme extends Package {
  /**
   * The name of this package.
   */
  name: "@frontity/mars-theme";

  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * In Frontity, any package can add React components to the site.
     * We use roots for that, scoped to the `theme` namespace.
     */
    theme: React.ElementType;
  };

  /**
   * The state exposed by this package.
   */
  state: {
    /**
     * Theme namespace.
     */
    theme: {
      /**
       * The auto prefetch setting. Defined in {@link AutoPrefetch}.
       */
      autoPrefetch: AutoPrefetch;

      /**
       * The menu of the theme. Expresed as an array of arrays that contain the
       * label in the first item and the link in the second.
       */
      menu: [string, string][];

      /**
       * Indicates if the mobile menu is opened or closed.
       */
      isMobileMenuOpen: boolean;

      /**
       * The settings of the featured images.
       */
      featured: {
        /**
         * Indicates if the feature images should be shown in the archives or
         * not.
         */
        showOnList: boolean;

        /**
         * Indicates if the feature images should be shown in the posts or not.
         */
        showOnPost: boolean;
      };
    };
  };

  /**
   * The actions exposed by this package.
   */
  actions: {
    /**
     * The theme namespace.
     */
    theme: {
      /**
       * Toggles the mobile menu between opened and closed states.
       */
      toggleMobileMenu: Action<MarsTheme>;

      /**
       * Closes the mobile menu, not matter the previous state.
       */
      closeMobileMenu: Action<MarsTheme>;
    };
  };

  /**
   * The libraries exposed by this package.
   */
  libraries: {
    /**
     * The Html2React namespace.
     */
    html2react: {
      /**
       * The Html2React processors.
       */
      processors: Html2React["libraries"]["html2react"]["processors"];
    };
  };
}

export default MarsTheme;
