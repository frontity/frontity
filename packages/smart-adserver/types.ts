import { Package } from "frontity/types";
import { css } from "frontity";

/**
 * Smart Adserver library.
 */
interface SAS {
  /**
   * The array of function callbacks that the SmartAdserver library uses to make
   * the ad calls.
   */
  cmd: unknown[];

  /**
   * The setup function which initializes the ad manager.
   */
  setup?: (params: {
    /**
     * ID of the network (account) at Smart.
     */
    networkid: string;

    /**
     * Domain of the network (account) at Smart.
     */
    domain: string;

    /**
     * Specifies if the calls are done asynchronously. Asynchronous calls are
     * recommended.
     */
    async: boolean;
  }) => void;

  /**
   * The function which performs a specific ad call.
   */
  call?: (calltype: string, options: CallOptions) => void;
}

declare global {
  /**
   * Extend window with the Smart Adserver globals.
   */
  interface Window {
    /**
     * Smart Adserver library.
     */
    sas: SAS;
  }
}

/**
 * The options used for a particular ad call.
 *
 * All the possible options are visible in
 * https://support.smartadserver.com/s/article/Tagging-guide.
 *
 */
interface CallOptions {
  /**
   * Identifies the website; parent element of a page.
   */
  siteId: number;

  /**
   * Identifies the page on a website; child element of the website.
   */
  pageId: number;

  /**
   * Identifies the format (medium rectangle, skyscraper, etc.).
   */
  formatId: number;

  /**
   * The `id` of the container of the page that will contain the ad.
   *
   * @defaultValue `"sas_${formatId}"`
   */
  tagId?: string;

  /**
   * The width of the ad. Used in the calls of type `iframe`.
   */
  width?: number;

  /**
   * The height of the ad. Used in the calls of type `iframe`.
   */
  height?: number;

  /**
   * Used to pass keywords and key=value pairs. See [Using keyword
   * targeting](https://support.smartadserver.com/s/article/Using-keyword-targeting).
   */
  target?: number;
}

/**
 * Props for the {@link SmartAd} component.
 */
export interface SmartAdProps extends CallOptions {
  /**
   * The type of the ad call.
   */
  callType: "iframe" | "std";

  /**
   * Minimum height of the container for the ad. Used with callType 'std'.
   *
   */
  minHeight?: number;

  /**
   * The optional styles that can be passed to the SmartAd component via `css`
   * prop. They will be merged with the default styles of the SmartAd component.
   */
  css?: ReturnType<typeof css>;
}

/**
 * Integration for Smart Adserver with Frontity.
 */
interface SmartAdserver extends Package {
  /**
   * Package name.
   */
  name: "@frontity/smart-adserver";

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
   * State exposed by this package.
   */
  state: {
    /**
     * The smartAdserver namespace.
     */
    smartAdserver: {
      /**
       * A flag that signals if the Smart Adserver library has been initialized
       * by calling `sas.setup()`.
       *
       * A SmartAd component should check it before running `sas.call()` in
       * order make sure that the ad calls run after initialization.
       *
       */
      isLoaded: boolean;

      /**
       * ID of the network (account) at Smart.
       */
      networkId?: string;

      /**
       * The subdomain of your network (account) at Smart.
       *
       * @example `"www", "www3"`
       */
      subdomain?: string;
    };

    /**
     * Fills.
     */
    fills: {
      /**
       * The smartAdserver namespace.
       */
      smartAdserver: {
        // Smart Adserver fills.
      };
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
       * The smartAdserver namespace.
       */
      smartAdserver: {
        /**
         * The component that is used to render the ads.
         */
        SmartAd: React.FC<SmartAdProps>;
      };
    };
  };
}

export default SmartAdserver;
