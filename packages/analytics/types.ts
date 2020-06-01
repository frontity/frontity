import { Package, Action } from "frontity/types";
import Source from "@frontity/source/types";

/**
 * The object sent to the pageview actions.
 */
export interface Pageview {
  /**
   * The URL or the page.
   *
   * @todo Needs to be renamed to `link` to be consistent with the other
   * Frontity APIs.
   */
  page: string;

  /**
   * The title of the page.
   */
  title: string;
}

export interface Event {
  event: string;
  payload: Record<string, any>;
}

export interface Analytics extends Package {
  roots: {
    analytics: React.FC;
  };
  /**
   * Actions.
   */
  actions: {
    /**
     * Analytics namespace.
     */
    analytics: {
      /**
       * Get the functions for every analytics package
       * and run `sendPageview` for each one.
       */
      sendPageview: Action<Analytics, Pageview>;
      sendEvent: Action<Analytics, Event>;
    };
    /**
     * Actions exposed by other analytics packages.
     */
    [key: string]: {
      sendPageview?: Action<Analytics, Pageview>;
      sendEvent?: Action<Analytics, Event>;
    };
  };
  state: {
    analytics: {
      namespaces: string[];
    };
    router?: {
      link: string;
    };
    source?: {
      get: Source["state"]["source"]["get"];
    };
  };
}

export default Analytics;
