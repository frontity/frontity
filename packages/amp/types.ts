import { Package, Action, MergePackages } from "frontity/types";
import Html2React from "@frontity/html2react/types";
import Source from "@frontity/source/types";

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
export type Packages = MergePackages<AMP, Source, Html2React>;

export default AMP;
