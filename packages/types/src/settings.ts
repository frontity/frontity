import { Package } from ".";
import { DeepPartial } from "ts-essentials";

/**
 * Gets a Package and returns only what's needed for the frontity.settings.js file.
 */
type PackageForSettings<Pkg extends Package> = Pkg extends Package
  ? {
      /**
       * Package name.
       */
      name: Required<Pkg["name"]>;

      /**
       * Flag indicating whether the package is active or not.
       */
      active?: boolean;

      /**
       * Package settings.
       */
      state?: DeepPartial<Pkg["state"]>;
    }
  : never;

/**
 * Settings for a single site.
 */
export interface MonoSettings<Pkg extends Package = Package> {
  /**
   * The name of the site.
   */
  name?: string;

  /**
   * Field to distinguish between different sites. Each time a new request is
   * received by Frontity, it tests the URL against the match field to know
   * which site it should load.
   *
   * @example
   * ```
   * // frontity.settings.js
   * export default [
   *   {
   *     name: "site-1",
   *     match: ["https://www.site-1.com"],
   *     packages: [...]
   *   },
   *   {
   *     name: "site-2",
   *     match: ["https://www.site-2.com"],
   *     packages: [...]
   *   }
   * ];
   * ```
   */
  match?: string[];

  /**
   * The mode of this site.
   *
   * @deprecated This parameter is deprecated. It could be used to choose to
   * render Frontity to `html` or `amp`.
   */
  mode?: string;

  /**
   * Global settings.
   */
  state?: {
    // Empty object.
  };

  /**
   * List of packages and their specific settings.
   *
   * @example
   * ```
   * // frontity.settings.js
   * export default [
   *   {
   *     packages: [
   *       "frontity/mars-theme",
   *       "frontity/tiny-router",
   *       {
   *         name: "frontity/wp-source",
   *         active: true,
   *         state: {  // Some settings for this package.
   *           source: {
   *             api: "https://wp.site.com/wp-json"
   *           }
   *         }
   *       }
   *     ]
   *   }
   * ];
   * ```
   */
  packages: (string | PackageForSettings<Pkg>)[];
}

/**
 * Settings for a site in a multisite settings file.
 */
export interface MultiSettings<Pkg extends Package = Package>
  extends MonoSettings<Pkg> {
  /**
   * Required package name.
   */
  name: string;
}

/**
 * Generate types for a `frontity.settings.ts` file.
 *
 * @typeparam Pkg - Package or union of package types.
 *
 * @example
 * ```
 * const settings: Settings<
 *  | Html2React
 *  | TinyRouter
 *  | WpSource
 *  | MarsTheme
 * > = {
 *   name: "My Site",
 *   state: {
 *     frontity: {
 *       url: "http://my.frontity.site",
 *     },
 *   },
 *   packages: [
 *     "frontity/html2react",
 *     "frontity/tiny-router",
 *     { name: "frontity/wp-source",
 *       state: {
 *         // ... Typed WpSource settings.
 *       },
 *     },
 *     {
 *       name: "frontity/mars-theme",
 *       state: {
 *         // ... Typed MarsTheme settings.
 *       },
 *     }
 *   ],
 * };
 * ```
 */
export type Settings<Pkg extends Package = Package> =
  | MonoSettings<Pkg>
  | MultiSettings<Pkg>[];

export default Settings;
