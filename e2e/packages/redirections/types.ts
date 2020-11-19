import { Action, Package } from "frontity/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

/**
 * Package to do e2e testing of 301 redirections stored in the Wordpress database.
 */
interface Redirections extends Package {
  /**
   * Roots exposed by this package.
   */
  roots: {
    /**
     * The Redirections namespace.
     */
    redirections: React.ElementType;
  };

  /**
   * Actions exposed by this package.
   */
  actions: {
    /**
     * The Redirections namespace.
     */
    redirections: {
      /**
       * The init action called internally by frontity.
       */
      init: Action<Packages>;
    };
  };
}

/**
 * All packages used internally by Redirections.
 */
export type Packages = Redirections & Source & Router;

export default Redirections;
