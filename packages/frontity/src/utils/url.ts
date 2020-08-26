/**
 * DEPRECATED.
 *
 * To be removed in the v2 version. Now that we've deprecated Node 8,
 * maintaining this is no longer required.
 *
 * It was meant to be used for compatibility with Node 8, where the global
 * `URL` was not present and therefore this was not possible without importing
 * URL from `"url"`.
 *
 * @example
 * ```js
 * const url = new URL("https://domain.com");
 * ```
 */

import { warn } from "@frontity/error";

/**
 * Re-export to add a deprecation warning.
 */
class FrontityURL extends URL {
  /**
   * Overwrite the constructor to add a deprecation warning.
   *
   * @param input - The input of {@link NodeURL}.
   * @param base - The base of {@link NodeURL}.
   */
  constructor(input: string, base?: string | URL) {
    warn(
      "Importing `URL` from Frontity has been deprecated. Please use `new URL()` instead."
    );
    super(input, base);
  }
}

export default FrontityURL;
