/**
 * Types of a Frontity package.
 *
 * The main purpose of this interface is to be extended by the specific types of
 * a Frontity package.
 */
export interface Package {
  /**
   * The name of the Frontity package.
   */
  name?: string;

  /**
   * An object of React components exposed by this package. The keys are the
   * namespaces.
   */
  roots?: {
    [namespace: string]: React.ReactType;
  };

  /**
   * The state exposed by this package.
   */
  state?: {
    /**
     * State exposed in the `frontity` namespace.
     */
    frontity?: {
      /**
       * The name of the site.
       *
       * Populated automatically by Frontity.
       */
      name?: string;

      /**
       * The link that was requested in the server-side rendering.
       *
       * Populated automatically by Frontity.
       */
      initialLink?: string;

      /**
       * Options for a frontity app that are parsed from the URL query string of
       * the page. This is for example used by `@frontity/core` to get the name
       * of the site from the `frontity_name` param in a multi-site WordPress
       * setup.
       *
       * @example `frontity_name`
       */
      options?: Record<string, string>;

      /**
       * The mode of this site.
       *
       * @deprecated This parameter is deprecated. It could be used to choose to
       * render Frontity to `html` or `amp`.
       */
      mode?: string;

      /**
       * Debug mode.
       *
       * Useful to test some packages that can do different things in debug
       * mode, like for example the slot and fills.
       *
       * @defaultValue false
       */
      debug?: boolean;

      /**
       * An array with the names of the Frontity packages that are loaded for
       * this site.
       *
       * Populated automatically by Frontity.
       */
      packages?: string[];

      /**
       * Indicates if Frontity is being run in the client or in the server.
       *
       * Populated automatically by Frontity.
       */
      platform?: "client" | "server";

      /**
       * Indicates if Frontity is in server-side rendering or client-side
       * rendering context. The difference between this and
       * `state.frontity.platform` is that `state.frontity.rendering` is still
       * `"ssr"` in the first frame of the client. That is useful when working
       * with components that are different when server-side rendering and
       * client-side rendering, because it won't cause a mismatch warning in the
       * React hydration.
       *
       * Populated automatically by Frontity.
       */
      rendering?: "ssr" | "csr";

      /**
       * The title of the site.
       *
       * Populated by the user in `frontity.settings.js`.
       */
      title?: string;

      /**
       * The description of the site.
       *
       * Populated by the user in `frontity.settings.js`.
       */
      description?: string;

      /**
       * The final url of the site.
       *
       * Populated by the user in `frontity.settings.js`.
       */
      url?: string;
    };

    /**
     * The configuration objects for all the fills exposed by this package.
     */
    fills?: {
      [namespace: string]: {
        [name: string]: Fill;
      };
    };

    /**
     * The rest of the state exposed by this package.
     *
     * TODO: Replace `any` with serializable objects and derived state.
     */
    [namespace: string]: {
      [key: string]: any;
    };
  };

  /**
   * The actions exposed by this package.
   */
  actions?: {
    [namespace: string]: Actions;
  };

  /**
   * The libraries exposed by this package.
   */
  libraries?: {
    /**
     * The Fill compoments exposed by this package.
     */
    fills?: {
      [namespace: string]: {
        [name: string]: React.ElementType;
      };
    };

    /**
     * The rest of the libraries exposed by this package.
     */
    [namespace: string]: {
      [library: string]: any;
    };
  };
}

export default Package;

/**
 * An individual Frontity action.
 */
interface Action {
  /**
   * Declaration of an action without additional params.
   *
   * @example
   * ```typescript
   * const someAction: ({ state, actions, libraries }) => {
   *  // Action content.
   * }
   *
   * // Calling the action:
   * actions.myPackage.someAction();
   * ```
   *
   * @param store - An object containing `state`, `actions` and `libraries`.
   *
   * @returns Void or Promise<void> if it is an async action.
   */
  (store: Pick<Package, "state" | "actions" | "libraries">): void | Promise<
    void
  >;

  /**
   * Declaration of an action with additional params.
   *
   * @example
   * ```typescript
   * const someAction: ({ state, actions, libraries }) => (...args) => {
   *  // Action content.
   * }
   *
   * // Calling the action:
   * actions.myPackage.someAction("arg 1", "arg 2", ...);
   * ```
   *
   * @param store - An object containing `state`, `actions` and `libraries`.
   * @param args - Any number of arguments.
   *
   * @returns Void or Promise<void> if it is an async action.
   */
  (store: Pick<Package, "state" | "actions" | "libraries">): (
    ...args: any
  ) => void | Promise<void>;
}

/**
 * An object containing Frontity actions, or other objects containing actions.
 */
interface Actions {
  [key: string]: (...args: any) => any | Actions;
}

/**
 * The configuration object for a Fill.
 */
export interface Fill {
  /**
   * The name of the Slot that this Fill wants to be injected in.
   */
  slot: string;

  /**
   * The name of the React component that it should be stored in
   * `libraries.fills`.
   */
  library: string;

  /**
   * The priority of this fill in relation to the other fills that also point to
   * the same `slot`.
   *
   * @defaultValue 10
   */
  priority?: number;

  /**
   * Optional object with props that will be passed to the React component
   * defined in `library`.
   */
  props?: {
    [key: string]: any;
  };
}
