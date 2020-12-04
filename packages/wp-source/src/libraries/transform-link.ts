import { State } from "frontity/types";
import { Packages } from "../../types";
import { concatLink, addFinalSlash } from "./route-utils";

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
  state: State<Packages>;

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
 * NOTE: the entity passed as argument was normalized by the schemas so its
 * `entity.link` property doesn't contain the domain name.
 *
 * @param transformLinkParams - Object of type {@link TransformLinkParams}.
 */
export const transformLink = ({
  entity,
  state,
  ...options
}: TransformLinkParams): void => {
  // Get the subdirectory for the final URL.
  const subdirectory = addFinalSlash(
    options.subdirectory ||
      state.source.subdirectory ||
      (state.frontity?.url && new URL(state.frontity.url).pathname) ||
      ""
  );

  // Get the path from the WP URL and add a trailing slash, just in case this
  // property was set without it.
  const wpPath = addFinalSlash(new URL(state.source.url).pathname);

  // Remove the WP URL from the final link and add the final subdirectory.
  entity.link = concatLink(subdirectory, entity.link.replace(wpPath, "/"));
};
