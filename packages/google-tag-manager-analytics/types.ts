import { ReactType } from "react";
import { Action } from "frontity/types";
import Analytics, { Pageview, Event } from "@frontity/analytics/types";

declare global {
  interface Window {
    dataLayer: {
      push: (payload: any) => number;
    };
  }
}

/**
 * `@frontity/google-tag-manager` package.
 */
interface GoogleTagManagerAnalytics extends Analytics {
  roots: Analytics["roots"] & {
    googleTagManagerAnalytics: ReactType;
  };
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
       * The pageview event is received by Google Tag Manager with the
       * following format:
       *
       * ```ts
       * {
       *   event: "virtualPageview",
       *   pageview: {
       *     link: pageview.link,
       *     title: pageview.title,
       *   }
       * }
       * ```
       *
       * @remarks
       * This action is called automatically if
       * `state.analytics.pageviews.googleTagManagerAnalytics` is set to `true`.
       *
       * @param pageview - Object of type {@link Pageview}.
       */
      pageview: Action<GoogleTagManagerAnalytics, Pageview>;
      /**
       * Send an event to all container IDs defined in
       * either `state.googleTagManagerAnalytics.containerId` or
       * `state.googleTagManagerAnalytics.containerIds`.
       *
       * The event is received by Google Tag Manager with the following format:
       *
       * ```ts
       * {
       *   event: event.name,
       *   payload: event.payload
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
