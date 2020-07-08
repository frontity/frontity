const suffix = "\nVisit https://community.frontity.org for help! 🙂\n";

interface ErrorOptions {
  throw?: boolean;
}

/**
 *
 *
 * @param message - Describes the error.
 * @param options Options
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
 */
export const warn = (message: string) => {
  if (process.env.NODE_ENV !== "production") {
    console.warn(message + suffix);
  }
};
