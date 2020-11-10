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
    redirections: React.ReactType;
  };
  /**
   * The state exposed by this package.
   */
  state: {
    /**
     * The router namespace.
     */
    router: {
      /**
       * How the router should handle 301 redirections that can be stored in the
       * WordPress database. Possible values are: "404" | "no" | "all" | RegExp.
       */
      redirections: Router["state"]["router"]["redirections"];
    };
  };
}

/**
 * All packages used internally by Redirections.
 */
export type Packages = Redirections & Source & Router;

export default Redirections;
