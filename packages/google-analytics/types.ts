import * as React from "react";
import { Action, MergePackages, Package, Frontity } from "frontity/types";
import Analytics, {
  Pageview,
  Event,
  AmpConfig,
} from "@frontity/analytics/types";

declare global {
  /**
   * Extended with Google Analytics global variables.
   */
  interface Window {
    /**
     * Google Analytics command queue function.
     */
    gtag: (...args: any) => any;
  }
}

/**
 * Google Analytics event that `actions.googleAnalytics.event` receives as
 * argument.
 *
 * @example
 * ```
 * {
 *   name: "Click",
 *   payload: {
 *     category: "Video",
 *     label: "Featured Media",
 *     value: 42,
 *   },
 * }
 * ```
 */
interface GoogleAnalyticsEvent extends Event {
  /**
   * Event name.
   *
   * The value of this property is mapped to the [`eventAction`](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventAction)
   * field of `analytics.js` events.
   *
   * @example "Click"
   */
  name: string;

  /**
   * Event payload.
   *
   * @example
   * ```
   * {
   *   category: "Video",
   *   label: "Featured Media",
   *   value: 42
   * }
   * ```
   */
  payload: {
    /**
     * Event category.
     *
     * The value of this property is mapped to the [`eventCategory`](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventCategory)
     * field of `analytics.js` events.
     *
     * @example "Video"
     */
    category: string;

    /**
     * Event label.
     *
     * The value of this property is mapped to the [`eventLabel`](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventLabel)
     * field of `analytics.js` events.
     *
     * @example "Featured Media"
     */
    label?: string;

    /**
     * Event value.
     *
     * The value of this property is mapped to the [`eventValue`](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue)
     * field of `analytics.js` events.
     *
     * @example 42
     */
    value?: number;

    /**
     * Any other property specified in [`analytics.js` field reference](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference).
     */
    [key: string]: any;
  };
}

/**
 * AMP config with GoogleAnalytics-specific variables.
 */
export interface GoogleAnalyticsAmpConfig extends AmpConfig {
  /**
   * AmpConfig vars.
   */
  vars?: AmpConfig["vars"] & {
    /**
     * Primary GTAG ID.
     */
    gtag_id?: string;

    /**
     * Object containing all tracking IDs and their configuration.
     */
    config?: Record<string, unknown>;
  };
}

/**
 * Analytics package to use Google Analytics with Frontity.
 */
interface GoogleAnalytics extends Package {
  /**
   * Package name.
   */
  name: "@frontity/google-analytics";

  /**
   * Root elements exposed by this package.
   */
  roots: Analytics["roots"] & {
    /**
     * Google Analytics root element.
     */
    googleAnalytics: React.ElementType;
  };

  /**
   * The state exposed by this package.
   */
  state: Analytics["state"] & {
    /**
     * State properties for the Google analytics package.
     */
    googleAnalytics: {
      /**
       * Tracking ID associated to a Google Analytics account.
       */
      trackingId?: string;

      /**
       * List of tracking IDs associated to a Google Analytics account.
       */
      trackingIds?: string[];

      /**
       * JSON configuration object to include inside the `<amp-analytics>` tags,
       * useful to add variables to the GTM data layer. Note that this props is
       * only used when the `@frontity/amp` package is installed.
       *
       * See https://support.google.com/tagmanager/answer/9205783#variables for
       * more info about how to define variables for GTM.
       */
      ampConfig?: GoogleAnalyticsAmpConfig;
    };
  };

  /**
   * The actions exposed by this package.
   */
  actions: Analytics["actions"] & {
    /**
     * Actions from the Google analytics package.
     */
    googleAnalytics: {
      /**
       * Send a pageview to all traking IDs defined in
       * either `state.googleAnalytics.trackingId` or
       * `state.googleAnalytics.trackingIds`.
       *
       * @remarks
       * This action is called automatically if
       * `state.analytics.pageviews.googleAnalytics` is set to `true`.
       *
       * @param pageview - Object of type {@link Pageview}.
       */
      pageview: Action<Packages, Pageview>;

      /**
       * Send an event to all traking IDs defined in
       * either `state.googleAnalytics.trackingId` or
       * `state.googleAnalytics.trackingIds`.
       *
       * @remarks
       * This action is called automatically when calling
       * `actions.analytics.event()` and
       * `state.analytics.pageviews.googleAnalytics` is set to `true`.
       *
       * @example
       * ```
       * actions.googleAnalytics.event({
       *   name: "Click",
       *   payload: {
       *     category: "Video",
       *     label: "Featured Media",
       *     value: 42,
       *   },
       * });
       * ```
       *
       * @param event - Object of type {@link GoogleAnalyticsEvent}.
       */
      event: Action<Packages, GoogleAnalyticsEvent>;
    };
  };
}

/**
 * Package types used internally by GoogleAnalytics.
 */
export type Packages = MergePackages<Frontity, GoogleAnalytics, Analytics>;

export default GoogleAnalytics;
