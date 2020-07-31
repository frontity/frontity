import { ReactType } from "react";
import { Action } from "frontity/types";
import Analytics, { Pageview, Event } from "@frontity/analytics/types";

declare global {
  /**
   * Extended with Google Tag Manager global variables.
   */
  interface Window {
    /**
     * GTM's data layer.
     */
    dataLayer: {
      /**
       * Function to add events to the GTM's data layer.
       */
      push: (payload: any) => number;
    };
  }
}

/**
 * Analytics package to use Google Tag Manager with Frontity.
 */
interface GoogleTagManagerAnalytics extends Analytics {
  /**
   * Root elements exposed by this package.
   */
  roots: Analytics["roots"] & {
    /**
     * Google Tag Manager Analytics root element.
     */
    googleTagManagerAnalytics: ReactType;
  };

  /**
   * The state exposed by this package.
   */
  state: Analytics["state"] & {
    /**
     * State properties for the Google Tag Manager package.
     */
    googleTagManagerAnalytics: {
      /**
       * Container ID associated to a Google Tag Manager account.
       */
      containerId?: string;

      /**
       * List of container IDs associated to a Google Tag Manager account.
       */
      containerIds?: string[];
    };
  };

  /**
   * The actions exposed by this package.
   */
  actions: Analytics["actions"] & {
    /**
     * Actions from the Google analytics package.
     */
    googleTagManagerAnalytics: {
      /**
       * Send a pageview event to all container IDs defined in
       * either `state.googleTagManagerAnalytics.containerId` or
       * `state.googleTagManagerAnalytics.containerIds`.
       *
       * @remarks
       * This action is called automatically if
       * `state.analytics.pageviews.googleTagManagerAnalytics` is set to `true`.
       *
       * @example
       * ```ts
       * // If you call the main analytics action with this params:
       * actions.analytics.pageview({
       *   link: "/2016/the-beauties-of-gullfoss",
       *   title: "The Beauties Of Gullfoss - Frontity Test",
       * });
       *
       * // The pageview is added to the GTM's data layer with this format:
       * {
       *   event: "pageview",
       *   link: "/2016/the-beauties-of-gullfoss",
       *   title: "The Beauties Of Gullfoss - Frontity Test",
       *   }
       * }
       * ```
       *
       * @param pageview - Object of type {@link Pageview}.
       */
      pageview: Action<GoogleTagManagerAnalytics, Pageview>;

      /**
       * Send an event to all container IDs defined in
       * either `state.googleTagManagerAnalytics.containerId` or
       * `state.googleTagManagerAnalytics.containerIds`.
       *
       * @example
       * ```ts
       * // If you call the main analytics action with this params:
       * actions.analytics.event({
       *   name: "Click",
       *   payload: {
       *     category: "video",
       *     label: "youtube",
       *   }
       * });
       *
       * // The event is added to the GTM's data layer with this format:
       * {
       *   event: "Click",
       *   payload: {
       *     category: "video",
       *     label: "youtube",
       *   }
       * }
       * ```
       *
       * @remarks
       * This action is called automatically when calling
       * `actions.analytics.event()` and
       * `state.analytics.pageviews.googleTagManagerAnalytics` is set to `true`.
       *
       * @param event - Object of type {@link Event}.
       */
      event: Action<GoogleTagManagerAnalytics, Event>;
    };
  };
}

export default GoogleTagManagerAnalytics;
