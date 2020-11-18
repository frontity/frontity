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
      previous?: string;

      /**
       * Object saved in `window.history.state`.
       */
      state: SetOptions["state"];
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
      updateState: Action<T extends null ? Router : T, unknown>;
    };
  };
}

export default Router;
