import { Package } from "frontity/types";
import Router from "@frontity/router/types";
import Html2React from "@frontity/html2react/types";
import WpSource from "@frontity/wp-source/types";

/**
 * Type for objects that contain the `yoast_head` field.
 */
export type WithYoastHead = {
  /**
   * All meta tags in string format.
   */
  yoast_head: string;
};

/**
 * Integrate your Frontity site with Yoast SEO plugin.
 */
interface YoastPackage extends Package {
  /**
   * Root components exported by this package.
   */
  roots: {
    /**
     * Yoast namespace.
     */
    yoast: React.FC;
  };

  /**
   * State exposed by this package.
   */
  state: {
    /**
     * Yoast namespace.
     */
    yoast: {
      /**
       * Define a set of properties to transform links present in the
       * `yoast_head` field in case you are
       * using Frontity in decoupled mode.
       *
       * If you are using Frontity in embedded mode, this property must be set
       * to `false`.
       *
       * @example
       * ```
       * {
       *   ignore: "^(wp-(json|admin|content|includes))|feed|comments|xmlrpc",
       *   base: "https://wp.mysite.com"
       * }
       * ```
       *
       * @example false
       */
      transformLinks:
        | {
            /**
             * RegExp in string format that defines a set of links that must
             * not be transformed.
             *
             * @defaultValue
             * ```
             * "^(wp-(json|admin|content|includes))|feed|comments|xmlrpc",
             * ```
             */
            ignore: string;

            /**
             * WordPress URL base that must be replaced by the Frontity URL
             * base (specified in `state.frontity.url`). If this value is not
             * set, it is computed from `state.source.api`.
             */
            base?: string;
          }
        | false;
    };
  };
}

export default YoastPackage;

/**
 * Packages that are dependencies of YoastPackage.
 */
export type Packages = YoastPackage & Router & WpSource & Html2React;
