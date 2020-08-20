import { Package, Action, ServerAction } from "frontity/types";
import TinyRouter from "@frontity/tiny-router/types";
import WpSource from "@frontity/wp-source/types";

/**
 * Package to do e2e testing of Frontity's infinite scroll hooks.
 */
interface UseInfiniteScroll extends Package {
  /**
   * Package name.
   */
  name: "use-infinite-scroll";
  /**
   * Actions exposed by this package.
   */
  actions: {
    /**
     * Theme namespace.
     */
    theme: {
      /**
       * Initializes the theme package.
       */
      init: Action<Packages>;
      /**
       * Before SSR function of the theme package.
       */
      beforeSSR: ServerAction<Packages>;
    };
  };
  /**
   * Roots components exposed by this package.
   */
  roots: {
    /**
     * Theme root component.
     */
    theme: React.ReactType;
  };
}

/**
 * All packages used internnally by UseInfiniteScroll.
 */
export type Packages = UseInfiniteScroll & TinyRouter & WpSource;

export default UseInfiniteScroll;
