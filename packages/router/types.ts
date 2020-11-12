import { Package, Action } from "frontity/types";

/**
 * Optional payload for `actions.router.set()`.
 */
export interface SetOptions {
  /**
   * The method used in `actions.router.set`.
   * - Method `"push"` corresponds to `window.history.pushState`.
   * - Method `"replace"` to `window.history.replaceState`.
   */
  method?: "push" | "replace";

  /**
   * An object that will be saved in `window.history.state`. This object is
   * recovered when the user goes back and forward using the browser buttons.
   */
  state?: Record<string, unknown>;
}

/**
 * Types for the Frontity router namespace.
 */
interface Router<T = null> extends Package {
  /**
   * State exposed by router packages.
   */
  state: {
    /**
     * Router namespace.
     */
    router: {
      /**
       * Variable that points to the current link in the Frontity site.
       *
       * @example "/" // You are on the homepage.
       * @example "/page/2" // You are on the homepage, page 2.
       * @example "/category/nature/" // You are in the category "Nature".
       * @example "/category/nature/page/2" // Same category, page 2.
       * @example "/some-post/" // You are in a post, path is /some-post/.
       * @example "/some-page/" // You are on a page, path is /some-page/.
       */
      link: string;

      /**
       * Object saved in `window.history.state`.
       */
      state: SetOptions["state"];

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
       * @example "no"
       * @example "all"
       * @example "404"
       * @example "RegExp:/some-post/(\\d*)"
       * @example "RegExp:/post-(\\w*)/(\\d*)"
       *
       * @defaultValue "no"
       */
      redirections: string | string[];
    };
  };

  /**
   * Actions exposed by router packages.
   */
  actions: {
    /**
     * Router namespace.
     */
    router: {
      /**
       * Change the current link in the Frontity site.
       *
       * @param link - The URL that will replace the current one.
       * @param options - Optional value of type {@link SetOptions}.
       */
      set:
        | Action<T extends null ? Router : T, string>
        | Action<T extends null ? Router : T, string, SetOptions>;
    };
  };
}

export default Router;
