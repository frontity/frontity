import { Package } from "frontity/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";
import SmartAdserver from "@frontity/smart-adserver/types";
import WpSource from "../../../packages/wp-source/types";

/**
 * Package to do the e2e testing of Smart ads.
 */
interface TestSmartAdserver extends Package {
  /**
   * Package name.
   */
  name: "e2e-smart-adserver";
  /**
   * State exposed by this package.
   */
  state: {
    /**
     * Source namespace.
     */
    source?: {
      /**
       * Map of data describing each link in Frontity.
       */
      data: WpSource["state"]["source"]["data"];
      /**
       * Getter for the data object given a specific link.
       */
      get: Source["state"]["source"]["get"];
    };
    /**
     * Router namespace.
     */
    router: {
      /**
       * Current page link.
       */
      link: Router["state"]["router"]["link"];
    };
  };
  /**
   * The root components exposed by this package.
   */
  roots: {
    /**
     * Theme namespace.
     */
    theme: React.ElementType;
  };
}

/**
 * All packages used internally by the TestSmartAdserver package.
 */
export type Packages = TestSmartAdserver & Router & Source & SmartAdserver;

export default TestSmartAdserver;
