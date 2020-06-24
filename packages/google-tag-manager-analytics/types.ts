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
interface GoogleTagManager extends Analytics {
  roots: Analytics["roots"] & {
    googleTagManager: ReactType;
  };
  state: Analytics["state"] & {
    /**
     * State properties for the Google Tag Manager package.
     */
    googleTagManager: {
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
    googleTagManager: {
      /**
       * Send a pageview event to all container IDs defined in
       * either `state.googleTagManager.containerId` or
       * `state.googleTagManager.containerIds`.
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
       * `state.analytics.pageviews.googleTagManager` is set to `true`.
       *
       * @param pageview - Object of type {@link Pageview}.
       */
      pageview: Action<GoogleTagManager, Pageview>;
      /**
       * Send an event to all container IDs defined in
       * either `state.googleTagManager.containerId` or
       * `state.googleTagManager.containerIds`.
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
       * `state.analytics.pageviews.googleTagManager` is set to `true`.
       *
       * @param event - Object of type {@link Event}.
       */
      event: Action<GoogleTagManager, Event>;
    };
  };
}

export default GoogleTagManager;
