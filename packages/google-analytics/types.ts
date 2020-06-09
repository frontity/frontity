import { ReactType } from "react";
import { Action, Package } from "frontity/types";
import Analytics, { Pageview, Event } from "@frontity/analytics/types";

declare global {
  interface Window {
    ga: Function;
  }
}

/**
 * Google Analytics event.
 */
interface GoogleAnalyticsEvent extends Event {
  /**
   * Event name.
   *
   * The value of this property is mapped to the {@link https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventAction | `eventAction`} field of `analytics.js` events.
   */
  name: string;
  /**
   * Event payload.
   */
  payload: {
    /**
     * Event category.
     *
     * The value of this property is mapped to the {@link https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventCategory | `eventCategory`} field of `analytics.js` events.
     */
    category: string;
    /**
     * Event label.
     *
     * The value of this property is mapped to the {@link https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventLabel | `eventCategory`} field of `analytics.js` events.
     */
    label?: string;
    /**
     * Event label.
     *
     * The value of this property is mapped to the {@link https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue | `eventCategory`} field of `analytics.js` events.
     */
    value?: number;
    /**
     * Any other property specified in {@link https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference | `analytics.js` field reference}.
     */
    [key: string]: any;
  };
}

/**
 * `@frontity/google-analytics` package.
 */
interface GoogleAnalytics extends Package {
  roots: Analytics["roots"] & {
    googleAnalytics: ReactType;
  };
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
       * @param event - Object of type {@link GoogleAnalyticsEvent}.
       */
      event: Action<Packages, GoogleAnalyticsEvent>;
    };
  };
}

export type Packages = GoogleAnalytics & Analytics;

export default GoogleAnalytics;
