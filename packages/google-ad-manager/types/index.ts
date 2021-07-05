import {
  Package,
  Fill,
  Frontity,
  MergePackages,
  LoadableComponent,
} from "frontity/types";
import { AmpAdProps } from "./amp";
export * from "./amp";

declare global {
  /**
   * Extended with GPT global variables.
   */
  interface Window {
    /**
     * Google Publisher Tag library.
     */
    googletag: googletag.Googletag;
  }
}

/**
 * A tuple for width and height values, in pixels.
 *
 * @example [300, 250]
 */
export type Size = [number, number];

/**
 * Props that {@link GooglePublisherTag} component receives.
 */
export interface GooglePublisherTagProps {
  /**
   * ID for this ad, used to generate the ID the `<div>` container will use.
   *
   * @example "div-gpt-below-content"
   */
  id: string;

  /**
   * Unit defined in Google Ad Manager.
   *
   * @example "/1234567/sports"
   */
  unit: string;

  /**
   * An object or a list of type {@link Size}.
   *
   * @example
   * ```
   * [300, 250]
   * ```
   *
   * @example
   * ```
   * [[300, 250], [300, 600]]
   * ```
   */
  size: Size | Size[];

  /**
   * A record of targeting options in key:value format.
   *
   * @example
   * ```ts
   * { interests: ["sports", "music", "movies"] }
   * ```
   */
  targeting?: Record<string, any>;

  /**
   * Data object representing a link, passed automatically if the component is
   * rendered by a slot.
   */
  data?: any;

  /**
   * A value passed as the first parameter to slot.setCollapseEmptyDiv(collapseEmptyDiv).
   *
   * @remarks
   * More details in:
   * https://developers.google.com/publisher-tag/reference#googletag.Slot_setCollapseEmptyDiv
   *
   * @defaultValue false
   */
  collapseEmptyDiv?: boolean;
}

/**
 * Integrate your Frontity site with Google Ad Manager.
 */
interface GoogleAdManager extends Package {
  /**
   * Package name.
   */
  name: "@frontity/google-ad-manager";

  /**
   * The state exposed by this package.
   */
  state: {
    /**
     * Fills namespace.
     */
    fills: {
      /**
       * All the fills under the Google Ad Manager namespace.
       *
       * @example
       * ```ts
       * export default {
       *   state: {
       *     fills: {
       *       googleAdManager: {
       *         contentAd1: {
       *           slot: "content-paragraph-1",
       *           library: "googleAdManager.GooglePublisherTag",
       *           priority: 5,
       *           props: {
       *             id: "content-ad-1",
       *             unit: "content/0812630984",
       *             size: {[300, 250]},
       *           },
       *         },
       *       },
       *     },
       *   },
       * }
       * ```
       */
      googleAdManager: Record<string, Fill>;
    };
  };

  /**
   * The libraries exposed by this package.
   */
  libraries: {
    /**
     * Fills namespace.
     */
    fills: {
      /**
       * Fill components from Google Ad Manager package.
       */
      googleAdManager: {
        /**
         * Component that renders an Google Publisher Tag ad.
         *
         * This component can be used directly from `libraries` or with fills.
         *
         * @example
         * ```tsx
         * const { GooglePublisherTag } = libraries.fills.googleAdManager;
         *
         * return (
         *   <GooglePublisherTag
         *     id="content-ad-1"
         *     unit="content/0812630984"
         *     size={[300, 250]}
         *   />
         * );
         * ```
         *
         * @param props - Object of type {@link GooglePublisherTagProps}.
         *
         * @returns A React element with the ad.
         */
        GooglePublisherTag: LoadableComponent<GooglePublisherTagProps>;

        /**
         * AMP ad tag for Google Ad Manager.
         *
         * @param props - Props of type {@link AmpAdProps}.
         * @returns Loadable component that representing a <amp-ad> tag.
         */
        AmpAd: LoadableComponent<AmpAdProps>;
      };
    };
  };
}

/**
 * Package types used internally by GoogleAdManager.
 */
export type Packages = MergePackages<Frontity, GoogleAdManager>;

export default GoogleAdManager;
