import { Package, Action, MergePackages } from "frontity/types";
import WpSource from "@frontity/wp-source/types";

/**
 * The types of the AMP Frontity package.
 */
interface AMP extends Package {
  /**
   * The name of this package.
   */
  name: "@frontity/amp";

  /**
   * Actions exposed by this package.
   */
  actions: {
    /**
     * Amp namespace.
     */
    amp: {
      /**
       * An internal action that bootstraps the initialization.
       *
       * @remarks
       * This action is not meant to be run by the user, but by the Frontity
       * framework.
       */
      init: Action<Packages>;
    };
  };
}

/**
 * Packages used internally by the AMP package.
 */
export type Packages = MergePackages<AMP, WpSource>;

export default AMP;
