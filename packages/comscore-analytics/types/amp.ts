import React from "react";
import { Package } from "frontity/types";

/**
 * Interface for AMP support.
 */
export default interface ComscoreAnalyticsAmp extends Package {
  /**
   * Root elements exported by this package.
   */
  roots: {
    /**
     * The comScore namespace.
     */
    comscoreAnalytics: React.ElementType;
  };

  /**
   * The state exposed by this package.
   */
  state: {
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
}
