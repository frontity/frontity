import { Package } from "frontity/types";
import Router from "@frontity/tiny-router/types";

/**
 * Package to do e2e testing of Frontity's TinyRouter package.
 */
interface TinyRouterTests extends Package {
  /**
   * State exposed by this package.
   */
  state?: {
    /**
     * Router namespace.
     */
    router: {
      /**
       * The state saved on the browser history.
       */
      state: {
        /**
         * A boolean that indicates if this has state or not. Used only for
         * testing purposes.
         */
        hasState?: boolean;
      };
    };
  };

  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * TinyRouterTests namespace.
     */
    tinyRouterTests: React.ReactType;
  };
}

/**
 * All packages used internally by TinyRouterTests.
 */
export type Packages = TinyRouterTests & Router;

export default TinyRouterTests;
