import { Package } from "frontity/types";

declare global {
  /**
   * Extend window with the Smart Adserver globals.
   */
  interface Window {
    /**
     * Smart Adserve library.
     */
    sas: {
      /**
       * The cmd.
       */
      cmd: Function[];
      /**
       * The setup function.
       */
      setup?: (params: {
        /**
         * NetworkId.
         */
        networkid: string;
        /**
         * Domain.
         */
        domain: string;
        /**
         * Async.
         */
        async: boolean;
      }) => void;
    };
  }
}

/**
 * Integration for Smart Adserver with Frontity.
 */
interface SmartAdserver extends Package {
  /**
   * Root elements exposed by this package.
   */
  roots: {

    /**
     * Smart Adserver root element.
     */
    smartAdserver: React.FC;
  };

  /**
   * State.
   */
  state: {
    /**
     * The namespace.
     */
    smartAdserver: {
      /**
       * NetworkId.
       */
      networkId?: string;

      /**
       * Subdomain.
       */
      subdomain?: string;
    };

    /**
     * Fills.
     */
    fills: {
      /**
       * SmartAdserver.
       */
      smartAdserver: {};
    };
  };

  /**
   * Libraries.
   */
  libraries: {
    /**
     * Fills.
     */
    fills: {
      /**
       * Smartad.
       */
      SmartAd: {};
    };
  };
}

export default SmartAdserver;
