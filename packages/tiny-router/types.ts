import Router from "@frontity/router/types";
import Source from "@frontity/source/types";
import { Frontity, Action, MergePackages, ServerAction } from "frontity/types";

/**
 * A tiny router for Frontity projects.
 */
interface TinyRouter extends Router {
  /**
   * Package name.
   */
  name: "@frontity/tiny-router";

  /**
   * State exposed by this package.
   */
  state: Router<Packages>["state"] & {
    /**
     * Router namespace.
     */
    router: {
      /**
       * When autoFetch is activated, tiny-router does a
       * `actions.source.fetch(link)` each time the action
       * `actions.router.set(link)` is triggered. This ensures that the data you
       * need for the current page is always available.
       *
       * It also does a `actions.source.fetch(link)` in the `beforeSSR` action
       * to ensure that the data needed for SSR is also available.
       *
       * @defaultValue true
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
       * - string - A string that contains a regex pattern. The string must
       *   start with `RegExp:`. This pattern will be matched against the
       *   current route and if matched, frontity will make an additional
       *   request to the WordPress instance to check if there exists a redirection.
       *   Note that the shorthand character classes will have to be escaped, so
       *   instead of `\d`, you will need to write `\\d`.
       *
       *   @example `"RegExp:/post-number/(\\d*)"`
       *
       * @defaultValue "no"
       */
      redirections: string | string[];
    };
  };

  /**
   * Actions exposed by this package.
   */
  actions: Router<Packages>["actions"] & {
    /**
     * Router namespace.
     */
    router: {
      /**
       * Initialize the tiny-router package.
       *
       * @remarks Called by the Frontity framework.
       */
      init: Action<Packages>;

      /**
       * Callback that runs on the server side, right before React's rendering.
       *
       * @remarks Called by the Frontity framework.
       */
      beforeSSR: ServerAction<Packages>;
    };
  };
}

export default TinyRouter;

/**
 * Packages that tiny-router depends on.
 */
export type Packages = MergePackages<Frontity, Source, TinyRouter>;
