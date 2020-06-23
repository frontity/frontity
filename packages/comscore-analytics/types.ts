import { ReactType } from "react";
import { Action, Package } from "frontity/types";
import Analytics, { Pageview } from "@frontity/analytics/types";

declare global {
  interface Window {
    COMSCORE: {
      beacon: Function;
    };
    _comscore: Array<{
      c1: string;
      c2: string;
    }>;
  }
}

/**
 * `@frontity/comscore-analytics` package.
 */
interface ComscoreAnalytics extends Package {
  roots: Analytics["roots"] & {
    comscoreAnalytics: ReactType;
  };
  state: Analytics["state"] & {
    /**
     * State properties for the Comscore analytics package.
     */
    comscoreAnalytics: {
      /**
       * Single tracking ID associated to a Comscore client.
       */
      trackingId?: string;
      /**
       * Array of tracking IDs associated to a Comscore client.
       */
      trackingIds?: string[];
    };
    analytics: {
      pageviews: {
        /**
         * Enable or disable sending pageviews to Comscore (default is `true`).
         */
        comscoreAnalytics: boolean;
      };
    };
  };
  actions: Analytics["actions"] & {
    /**
     * Actions from the Comscore analytics package.
     */
    comscoreAnalytics: {
      /**
       * Send a pageview to all Comscore traking ids defined in
       * `state.comscoreAnalytics.trackingIds`.
       *
       * @remarks
       * This action is called automatically if
       * `state.analytics.pageviews.comscoreAnalytics` is set to `true`.
       *
       * @param pageview - Object of type {@link Pageview}.
       */
      pageview: Action<ComscoreAnalytics, Pageview>;
    };
  };
}
export type Packages = ComscoreAnalytics & Analytics;

export default ComscoreAnalytics;
