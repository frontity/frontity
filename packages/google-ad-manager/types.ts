import { Connect, Package, Fill } from "frontity/types";
import { FC } from "react";

/**
 * A duple for width and height values, in pixels.
 */
export type Size = [number, number];

/**
 * Props that {@link GooglePublisherTag} component receives.
 */
export interface GooglePublisherTagProps {
  /**
   * ID for this ad, used to generate the ID for the `<div>` element that will
   * contain the Google Publisher Tag ad.
   */
  id: string;

  /**
   * Unit defined in Google Ad Manager.
   */
  unit: string;

  /**
   * An object or a list of type {@link Size}.
   */
  size: Size | Size[];

  /**
   * A record of targeting options in key:value format.
   */
  targeting?: Record<string, any>;
}

/**
 * Integrate your Frontity site with Google Ad Manager.
 */
interface GoogleAdManager extends Package {
  /**
   * Root elements exposed by this package.
   */
  roots: {
    /**
     * Google Ad Manager root element.
     */
    googleAdManager: FC<Connect<GoogleAdManager>>;
  };

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
     * Google Ad Manager namespace.
     */
    googleAdManager: {
      /**
       * Component that renders an Google Publisher Tag ad.
       *
       * This component can be used directly from `libraries` or with fills.
       *
       * @example
       * ```tsx
       * const { GooglePublisherTag } = libraries.googleAdManager;
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
      GooglePublisherTag: FC<Connect<GoogleAdManager, GooglePublisherTagProps>>;
    };
  };
}

export default GoogleAdManager;
