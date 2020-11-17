import { Package } from "frontity/types";
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
}

/**
 * All packages used internally by Redirections.
 */
export type Packages = Redirections & Source & Router;

export default Redirections;
