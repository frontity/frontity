import { Package, Action, MergePackages } from "frontity/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

/**
 * Pageview payload passed to analytics `pageview` actions.
 */
export interface Pageview {
  /**
   * Link of the page (without the host part).
   *
   * @example "/2016/the-beauties-of-gullfoss"
   */
  link: string;

  /**
   * Title of the page.
   *
   * @example "The Beauties Of Gullfoss - Frontity Test"
   */
  title: string;
}

/**
 * Eventy payload passed to analytics `event` actions.
 */
export interface Event {
  /**
   * The name of the event.
   *
   * @example "Click"
   */
  name: string;

  /**
   * Collection of properties sent along with the event.
   *
   * @remarks
   * Each analytics package requires some specific properties to be included
   * here. Check out their documentation for more info.
   *
   * @example
   * ```
   * {
   *   label: "video",
   *   category: "youtube",
   * }
   * ```
   */
  payload: Record<string, any>;
}

/**
 * Base types and actions to build analytics packages for Frontity.
 */
interface Analytics extends Package {
  /**
   * Root elements exposed by this package.
   */
  roots: {
    /**
     * Analytics root element.
     */
    analytics: React.FC;
  };

  /**
   * The actions exposed by this package.
   */
  actions: {
    /**
     * Analytics namespace.
     */
    analytics: {
      /**
       * Send a pageview to all active analytics packages.
       *
       * This action takes all namespaces defined in `state.analytics.pageviews`
       * that are `true` and calls the `pageview` action of each one with the
       * specified `Pageview` object.
       *
       * @remarks
       * This action is used by the `roots.analytics` component and is not
       * meant to be called directly.
       *
       * @example
       * ```
       * actions.analytics.pageview({
       *   link: "/2016/the-beauties-of-gullfoss",
       *   title: "The Beauties Of Gullfoss",
       * });
       * ```
       *
       * @param pageview - Object of type {@link Pageview}.
       */
      pageview: Action<Analytics, Pageview>;

      /**
       * Send an event to all active analytics packages.
       *
       * This action takes all namespaces defined in `state.analytics.events`
       * that are `true` and calls the `event` action of each one with the
       * specified `Event` object.
       *
       * @example
       * ```
       * actions.analytics.event({
       *   name: "click",
       *   payload: {
       *     category: "video",
       *     label: "featured-media",
       *   },
       * });
       * ```
       *
       * @param event - Object of type {@link Event}.
       */
      event: Action<Analytics, Event>;
    };
  };

  /**
   * The state exposed by this package.
   */
  state: {
    /**
     * Analytics namespace.
     */
    analytics: {
      /**
       * Map of namespaces with boolean values.
       *
       * This object is used by `actions.analytics.pageview` to know which
       * analytics packages should send the pageview to their respective
       * services.
       *
       * @remarks
       * If you want to disable sending pageviews for a specific analytics
       * package, the respective namespace of that package should be set here to
       * `false`.
       *
       * @example
       * ```
       * pageviews: {
       *   googleAnalytics: false,
       *   comscoreAnalytics: true
       * }
       * ```
       */
      pageviews: Record<string, boolean>;

      /**
       * Map of namespaces with boolean values.
       *
       * This object is used by `actions.analytics.event` to know which
       * analytics packages should send the event to their respective services.
       *
       * @remarks
       * If you want to disable sending events for a specific analytics
       * package, the respective namespace of that package should be set here to
       * `false`.
       *
       * @example
       * ```
       * events: {
       *   googleAnalytics: true,
       *   comscoreAnalytics: false,
       * }
       * ```
       */
      events: Record<string, boolean>;
    };
  };
}

/**
 * Package types used internally by Analytics.
 */
export type Packages = MergePackages<Analytics, Router, Source>;

export default Analytics;
