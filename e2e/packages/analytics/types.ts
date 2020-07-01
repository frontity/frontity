import { Package, Action } from "frontity/types";
import Analytics, { Pageview, Event } from "@frontity/analytics/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

/**
 * Package to do e2e testing of Frontity's analytics library.
 */
interface TestAnalytics extends Package {
  /**
   * Package name.
   */
  name: "e2e-analytics";
  /**
   * State exposed by this package.
   */
  state: {
    /**
     * Source namespace.
     */
    source: {
      /**
       * Map of data describing each link in Frontity.
       */
      data: Source["state"]["source"]["data"];
      /**
       * Get a data object for the specified link.
       */
      get: Source["state"]["source"]["get"];
    };
    /**
     * Analytics namespace.
     */
    analytics: Analytics["state"]["analytics"];
    /**
     * Test Analytics namespace.
     */
    testAnalytics: {
      /**
       * Array containing all sent pageviews using
       * `actions.analytics.pageview()`.
       */
      pageviews: Pageview[];
      /**
       * Array containing all sent pageviews using `actions.analytics.event()`.
       */
      events: Event[];
      /**
       * Event used the {@link Theme} component to test the
       * `actions.analytics.event()` action.
       */
      testEvent: Event;
    };
  };
  /**
   * Actions exposed by this package.
   */
  actions: {
    /**
     * Source namespace.
     */
    source: {
      /**
       * Fetch data related to the passed link.
       */
      fetch: Source["actions"]["source"]["fetch"];
    };
    /**
     * Test Analytics namespace.
     */
    testAnalytics: {
      /**
       * Action executed by `actions.analytics.pageview()`.
       *
       * It adds the pageview it receives as argument to the
       * `state.testAnalytics.pageviews` list.
       */
      pageview: Action<Packages, Pageview>;
      /**
       * Action executed by `actions.analytics.pageview()`.
       *
       * It adds the pageview it receives as argument to the
       * `state.testAnalytics.pageviews` list.
       */
      event: Action<Packages, Event>;
    };
  };
  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Theme namespace.
     */
    theme: React.ReactType;
  };
}
/**
 * All packages used internally by TestAnalytics.
 */
export type Packages = TestAnalytics & Router & Source & Analytics;

export default TestAnalytics;
