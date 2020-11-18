import React from "react";
import { Action, MergePackages, Package } from "frontity/types";
import Analytics, { Pageview } from "@frontity/analytics/types";

/**
 * Comscore's Tag Parameters.
 */
interface ComscoreTagParams {
  /**
   * Tag Type. Pre-populated with a constant value of `2`.
   *
   * @defaultValue 2
   */
  c1?: string;

  /**
   * Unique ID for each client assigned by Comscore.
   */
  c2: string;

  /**
   * Full Page URL.
   *
   * Manually populated full page URL, including query string variables.
   */
  c4?: string;

  /**
   * Genre of content.
   *
   * Alphanumeric value used for client specific custom classification.
   */
  c5?: string;

  /**
   * Package.
   *
   * Alphanumeric value for customized aggregation to reflect sections or site
   * centric advertising packages.
   */
  c6?: string;

  /**
   * Client Segment ID.
   *
   * Alphanumeric value for Publisher’s own segment for the machinethe content
   * asset is being served to.
   */
  c15?: string;
}
declare global {
  /**
   * Extended with Comscore global variables.
   */
  interface Window {
    /**
     * Comscore main object.
     */
    COMSCORE: {
      /**
       * Function that sends tag params to Comscore.
       *
       * @remarks
       * It generates the following params automatically, which are sent to
       * Comscore along with the received ones:
       *
       * - `c7`: Full Page URL, including query string variables.
       * - `c8`: Page Title.
       * - `c9`: Referring URL.
       *
       * @param tagParams - Object of type {@link ComscoreTagParams}.
       */
      beacon: (tagParams: ComscoreTagParams) => void;
    };

    /**
     * Array that stores the first tag params generated right before the
     * Comscore library has loaded.
     */
    _comscore: Array<ComscoreTagParams>;
  }
}

/**
 * Comscore Analytics package for Frontity.
 */
interface ComscoreAnalytics extends Package {
  /**
   * Package name.
   */
  name: "@frontity/comscore-analytics";
  /**
   * Root elements exposed by this package.
   */
  roots: Analytics["roots"] & {
    /**
     * Comscore Analytics root element.
     */
    comscoreAnalytics: React.ElementType;
  };

  /**
   * The state exposed by this package.
   */
  state: Analytics["state"] & {
    /**
     * Comscore Analytics namespace.
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
  };

  /**
   * The actions exposed by this package.
   */
  actions: Analytics["actions"] & {
    /**
     * Comscore Analytics namespace.
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

/**
 * Package types used internally in ComscoreAnalytics.
 */
export type Packages = MergePackages<ComscoreAnalytics, Analytics>;

export default ComscoreAnalytics;
