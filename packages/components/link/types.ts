import { MouseEvent } from "react";
import { Package } from "frontity/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

/**
 * The auto prefetching setting. It can be:
 * - "hover": Prefetches links on hover.
 * - "in-view": Prefetch links currently visible in the viewport.
 * - "all": Prefetches all internal links on the page.
 * - "no": No auto prefetch.
 */
export type AutoPrefetch = "no" | "in-view" | "hover" | "all";

/**
 * The types of the theme namespace required by the {@link Link} component.
 */
export interface Theme extends Package {
  /**
   * The state exposed by the theme package.
   */
  state: {
    /**
     * The theme namespace.
     */
    theme: {
      /**
       * The auto prefetch setting. Defined in {@link AutoPrefetch}.
       *
       * @defaultValue "no"
       */
      autoPrefetch: AutoPrefetch;
    };
  };
}

/**
 * Merge of the types of all the namespaces required by the {@link Link}
 * component.
 */
export type Packages = Source & Router & Theme;

/**
 * Props for React component {@link Link}.
 */
export interface LinkProps {
  /**
   * The URL to link to.
   */
  link: string;

  /**
   * The target of the anchor:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target.
   *
   * @defaultValue "_self"
   */
  target?: "_self" | "_blank";

  /**
   * The onClick handler. Can be used to pass an optional callback that will be
   * invoked on click.
   */
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Whether the browser should scroll up to the top upon navigating to a new
   * page.
   *
   * @defaultValue true
   */
  scroll?: boolean;

  /**
   * Whether frontity should automatically prefetch this link or not.
   * The prefetching mode is controlled through state.theme.prefetch.
   *
   * @defaultValue true
   */
  prefetch?: boolean;

  /**
   * Indicates the element that represents the current item within a container
   * or set of related elements:
   * https://www.w3.org/TR/wai-aria-1.1/#aria-current.
   */
  "aria-current"?: React.AriaAttributes["aria-current"];

  /**
   * Represents any other prop that can be passed to Link.
   * These props are passed down to the `<a/>` element.
   */
  [key: string]: any;
}

/**
 * Types for `window.navigator` that contain `connection`.
 *
 * It seems like these types are not present in the TS interface because they
 * are not standard yet.
 *
 * A full implementation can be found in:
 * https://github.com/lacolaco/network-information-types/blob/master/index.d.ts.
 */
export interface NavigatorWithConnection extends Navigator {
  /**
   * The connection namespace.
   */
  connection: {
    /**
     * Indicates if the user is trying to save data.
     */
    saveData: boolean;

    /**
     * The type of connection.
     */
    effectiveType: "2g" | "3g" | "4g" | "slow-2g";
  };
}
