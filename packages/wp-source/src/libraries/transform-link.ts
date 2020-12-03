import { State } from "frontity/types";
import WpSource from "../../types";
import { concatLink, extractLinkParts } from "./route-utils";

/**
 * Arguments passed to {@link transformLink}.
 */
interface TransformLinkParams {
  /**
   * The entity we want to transform its link.
   */
  entity: {
    /**
     * Link attribute.
     */
    link: string;
  };

  /**
   * Frontity state.
   */
  state: State<WpSource>;

  /**
   * Optional property if `subdirectory` is not specified in the state. This
   * value is passed by `populate()`.
   */
  subdirectory?: string;
}

/**
 * Utility used by {@link populate} to convert the `link` attribute that
 * entities have so they point to Frontity instead to WordPress.
 *
 * @param transformLinkParams - Object of type {@link TransformLinkParams}.
 */
export const transformLink = ({
  entity,
  state,
  ...options
}: TransformLinkParams): void => {
  let { subdirectory } = state.source;
  if (options.subdirectory) subdirectory = options.subdirectory;

  // Get API subdirectory.
  const path = !state.source.isWpCom
    ? extractLinkParts(state.source.api).pathname.replace(/\/wp-json\/?$/, "/")
    : "";

  // Remove API subdirectory.
  let { link } = entity;
  if (path && link.startsWith(path)) link = link.replace(path, "/");

  // Add subdirectory if it exists.
  entity.link = subdirectory ? concatLink(subdirectory, link) : link;
};
