const suffix = "\nVisit https://community.frontity.org for help! 🙂\n";

/**
 * The options for the {@link error} function.
 */
interface ErrorOptions {
  /**
   * Indicate if the function should throw or just log the error in the console
   * using `console.error`.
   *
   * @example
   * ```js
   * error("Something wrong happaned.", { throw: false });
   * ```
   *
   * @defaultValue true
   */
  throw?: boolean;
}

/**
 * Throws an error. In development, it adds a message that encourage users to
 * visit the Frontity community if they need help.
 *
 * @example error("Something wrong happened.")
 *
 * @param message - The message that describes the error.
 * @param options - The options, described in {@link ErrorOptions}.
 */
export const error = (message: string, options: ErrorOptions = {}): void => {
  const doThrow = typeof options.throw !== "undefined" ? options.throw : true;
  if (process.env.NODE_ENV !== "production") {
    if (doThrow) throw new Error(message + suffix);
    console.error(message + suffix);
  } else {
    if (doThrow) throw new Error(message);
    console.error(message);
  }
};

/**
 * Logs a warning in the console, adding a message that indicates users to
 * visit the Frontity community if they need help. It's intended to be used
 * by Frontity packages.
 *
 * @example warn("You should do/change something.")
 *
 * @param message - The message that describes the warning.
 */
export const warn = (message: string) => {
  if (process.env.NODE_ENV !== "production") {
    console.warn(message + suffix);
  }
};
