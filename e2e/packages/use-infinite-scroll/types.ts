import { Package, Action, ServerAction, MergePackages } from "frontity/types";
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
   * State exposed by this package.
   */
  state: {
    /**
     * Theme namespace.
     */
    theme: {
      /**
       * Flag that indicates if infinite hooks are enabled.
       */
      isInfiniteScrollEnabled: boolean;

      /**
       * Value indicating how may pages should be fetched automatically.
       */
      infiniteScrollLimit: number;
    };
  };

  /**
   * Actions exposed by this package.
   */
  actions: {
    /**
     * Theme namespace.
     */
    theme: {
      /**
       * Enable or disable infinite scroll hooks.
       */
      toggleInfiniteScroll: Action<Packages>;

      /**
       * Enable or disable infinite scroll hooks.
       */
      limitInfiniteScroll: Action<Packages, number>;

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
    theme: React.ElementType;
  };
}

/**
 * All packages used internnally by UseInfiniteScroll.
 */
export type Packages = MergePackages<UseInfiniteScroll, TinyRouter, WpSource>;

export default UseInfiniteScroll;
