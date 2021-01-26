import * as React from "react";
import { Action, MergePackages, Package } from "frontity/types";
import Analytics, { Pageview, Event } from "@frontity/analytics/types";

declare global {
  /**
   * Extended with Google Analytics global variables.
   */
  interface Window {
    /**
     * Google Analytics command queue function.
     */
    ga: (...args: any) => any;
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
export type Packages = MergePackages<GoogleAnalytics, Analytics>;

export default GoogleAnalytics;
