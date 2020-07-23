import { Connect, Package, Fill } from "frontity/types";
import { FC } from "react";

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
 * A duple for width and height values, in pixels.
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
     * It simply adds the Google Publisher Tag library.
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
       *     data={state.source.get(state.router.link)}
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
