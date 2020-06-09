import { Package, Action } from "frontity/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

/**
 * Pageview payload passed to analytics `pageview` actions.
 */
export type Pageview = {
  /**
   * Link of the page (without the host part).
   */
  link: string;
  /**
   * Title of the page.
   */
  title: string;
};

/**
 * Eventy payload passed to analytics `event` actions.
 */
export type Event = {
  /**
   * The name of the event.
   */
  name: string;
  /**
   * Collection of properties sent along with the event.
   */
  payload: Record<string, any>;
};

interface Analytics extends Package {
  roots: {
    analytics: React.FC;
  };
  actions: {
    /**
     * Actions to interact with all the analytics packages.
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
       * @param pageview - Object of type {@link Pageview}
       */
      pageview: Action<Analytics, Pageview>;
      /**
       * Send an event to all active analytics packages.
       *
       * This action takes all namespaces defined in `state.analytics.events`
       * that are `true` and calls the `event` action of each one with the
       * specified `Event` object.
       *
       * @param event - Object of type {@link Event}
       */
      event: Action<Analytics, Event>;
    };
  };
  state: {
    /**
     * State of the analytics package.
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
       * `false`, e.g.
       *
       * ```
       * pageviews: {
       *   googleAnalytics: false
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
       * `false`, e.g.
       *
       * ```
       * events: {
       *   googleAnalytics: false
       * }
       * ```
       */
      events: Record<string, boolean>;
    };
  };
}

export type Packages = Analytics & Router & Source;

export default Analytics;
