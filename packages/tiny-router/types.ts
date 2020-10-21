import Router from "@frontity/router/types";
import Source from "@frontity/source/types";
import { Action, ServerAction } from "frontity/types";

/**
 * The frontity tiny-router package.
 * A very simple router which just exposes one action: `actions.router.set()`.
 */
interface TinyRouter extends Router {
  /**
   * The package name.
   */
  name: "@frontity/tiny-router";
  /**
   * State exposed by the router.
   */
  state: Router<TinyRouter>["state"] & {
    /**
     * The frontity namespace.
     */
    frontity?: Router["state"]["frontity"];
    /**
     * The router namespace.
     */
    router: {
      /**
       * When `true`, tiny-router does a actions.source.fetch(link) each time
       * the actions.router.set(link) is called. This ensures that the data you
       * need for the current page is always available.
       */
      autoFetch?: boolean;

      /**
       * How the router should handle 301 redirections that can be stored in the
       * WordPress database e.g. Via a Redirection plugin: https://wordpress.org/plugins/redirection/.
       *
       * - "no" - Does not handle them at all.
       *
       * - "all"  - Always make an additional request to the WordPress instance
       * to check if there exists a redirection.
       *
       * - "404" - Only send the additional request to the WordPress instance
       * if the original request returned a 404.
       *
       * - string - A string pattern used to match a route according to rules in
       *  https://github.com/pillarjs/path-to-regexp.
       *
       * @defaultValue "no"
       */
      redirections: string | string[];
    };
    /**
     * The source namespace.
     */
    source?: {
      /**
       * Returns an object that gives you info about the type of that link and related entities.
       */
      get?: Source["state"]["source"]["get"];
    };
  };
  /**
   * Actions exposed by the router.
   */
  actions: Router<TinyRouter>["actions"] & {
    /**
     * Router namespace.
     */
    router: {
      /**
       * `init()` action used internally by Frontity.
       */
      init: Action<TinyRouter>;
      /**
       * `beforeSSR()` action used internally by Frontity.
       */
      beforeSSR: ServerAction<TinyRouter>;
    };
    /**
     * The source namespace.
     */
    source?: {
      /**
       * The action which fetches all entities related to a link.
       */
      fetch?: Source["actions"]["source"]["fetch"];
    };
  };
  /**
   * Libraries exposed by the router.
   */
  libraries: {
    /**
     * The source namespace.
     */
    source?: {
      /**
       * Map the link onto a standard format (append final slash, etc.).
       */
      normalize?: Source["libraries"]["source"]["normalize"];
    };
  };
}

export default TinyRouter;
