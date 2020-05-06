/**
 * Provides functions to log errors and warnings in Frontity.
 * @packageDocumentation
 */

/**
 * Community message added to {@link error} and {@link warn}.
 *
 * @private
 */
const suffix = "\nVisit https://community.frontity.org for help! 🙂\n";

interface Error {
  (
    message: string,
    options: {
      /**
       * Throws if true, does a console.error if false.
       * @default true
       */
      throw?: boolean;
    }
  ): void;
}

/**
 * Throws an error, but adding a standard Frontity suffix to the message
 * encouraging users to visit the community for help.
 *
 * @param message The error message.
 * @param options The options of {@link error}.
 */
export const error: Error = (message, options = {}) => {
  const defaultOptions = { throw: true };
  options = { ...defaultOptions, ...options };

  if (process.env.NODE_ENV !== "production") {
    if (options.throw) throw new Error(message + suffix);
    console.error(message + suffix);
  } else {
    if (options.throw) throw new Error(message);
    console.error(message);
  }
};

/**
 * Logs a warning in the console adding a standard Frontity suffix to the
 * message encouraging users to visit the community for help.
 *
 * @param message The warning message.
 */
export const warn = (message: string) => {
  if (process.env.NODE_ENV !== "production") {
    console.warn(message + suffix);
  }
};
