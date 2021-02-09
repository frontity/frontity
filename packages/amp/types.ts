import { Package, Action, MergePackages } from "frontity/types";
import WpSource from "@frontity/wp-source/types";

/**
 *
 */
interface AMP extends Package {
  /**
   *
   */
  name: "@frontity/amp";

  /**
   *
   */
  actions: {
    /**
     *
     */
    amp: {
      /**
       *
       */
      init: Action<Packages>;
    };
  };
}

/**
 *
 */
export type Packages = MergePackages<AMP, WpSource>;

export default AMP;
