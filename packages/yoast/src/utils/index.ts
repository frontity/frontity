import { transformLink } from "@frontity/head-tags/src/utils";

/**
 * Parameters of the {@link transformAllLinks} function.
 */
interface TransformAllLinksParams {
  /**
   * HTML code containing the links that will be changed.
   */
  html: string;
  /**
   * The old base (hostname and path) that will be changed by the `newBase`.
   */
  base: string;
  /**
   * The new base that will replace the old `base`.
   */
  newBase: string;
  /**
   * A Regexp (in string format) so that if the link matches the transform
   * doesn't happen.
   */
  ignore: string;
}

/**
 * Changes all URLs to the Frontity one, instead of the WordPress one.
 *
 * @param params - Defined in {@link TransformAllLinksParams}.
 *
 * @returns HTML code with links changed.
 */
export const transformAllLinks = ({
  html,
  ignore,
  base,
  newBase,
}: TransformAllLinksParams) =>
  html.replace(
    /"(https?:\/[^"]+)"/g,
    (_match, link) =>
      `"${transformLink({
        link,
        ignore,
        base,
        newBase,
      })}"`
  );
