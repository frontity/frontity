import { Package } from "frontity/types";

declare global {
  /**
   * Extend window with the Smart Adserver globals.
   */
  interface Window {
    /**
     * Smart Adserver library.
     */
    sas: {
      /**
       *
       */
      cmd: Function[];
      /**
       *
       */
      setup?: (params: {
        /**
         *
         */
        networkid: string;
        /**
         *
         */
        domain: string;
        /**
         *
         */
        async: boolean;
      }) => void;

      /**
       *
       */
      call?: (calltype: string, options: CallOptions) => void;
    };
  }
}

/**
 *
 */
export interface CallOptions {
  /**
   *
   */
  siteId;
  /**
   *
   */
  pageId;
  /**
   *
   */
  formatId;
  /**
   *
   */
  tagId;
  /**
   *
   */
  width;
  /**
   *
   */
  height;
  /**
   *
   */
  target;
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
     *
     */
    smartAdserver: {
      /**
       *
       */
      networkId?: string;

      /**
       *
       */
      subdomain?: string;
    };

    /**
     * Fills.
     */
    fills: {
      /**
       *
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
       *
       */
      smartAdserver: {
        /**
         *
         */
        SmartAd: React.FC;
      };
    };
  };
}

export default SmartAdserver;
