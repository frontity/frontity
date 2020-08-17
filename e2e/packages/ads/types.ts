import { Package } from "frontity/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";
import GoogleAdManager from "@frontity/google-ad-manager/types";

/**
 * Package to do e2e testing of Frontity's ad libraries.
 */
interface TestAds extends Package {
  /**
   * State exposed by this package.
   */
  state: {
    /**
     * Source namespace.
     */
    source: {
      /**
       * Map of data describing each link in Frontity.
       */
      data: Source["state"]["source"]["data"];

      /**
       * Get a data object for the specified link.
       */
      get: Source["state"]["source"]["get"];
    };
  };
  /**
   * Actions exposed by this package.
   */
  actions: {
    /**
     * Source namespace.
     */
    source: {
      /**
       * Fetch data related to the passed link.
       */
      fetch: Source["actions"]["source"]["fetch"];
    };
  };
  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Theme namespace.
     */
    theme: React.ReactType;
  };
}

/**
 * All packages used internally by TestAds.
 */
export type Packages = TestAds & Router & Source & GoogleAdManager;

export default TestAds;
