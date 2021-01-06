import Package from "./package";
import { MonoSettings } from "./settings";

/**
 * All the properties exposed by the Frontity framework.
 */
interface Frontity extends Package {
  /**
   * State exposed by this package.
   */
  state: {
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
       * The match properry.
       *
       * Populated automaticaly by frontity from settings.
       */
      match?: MonoSettings["match"];

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
  };
}

export default Frontity;
