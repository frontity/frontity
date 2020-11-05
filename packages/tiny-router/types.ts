import Router from "@frontity/router/types";
import Source from "@frontity/source/types";
import { Package, Action, MergePackages, ServerAction } from "frontity/types";

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
       * Callback that runs in server side, right before the react rendering.
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
export type Packages = MergePackages<Package, Source, TinyRouter>;
