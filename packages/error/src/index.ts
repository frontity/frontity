const suffix = "\nVisit https://community.frontity.org for help! 🙂\n";

interface FrontityError {
  (
    message: string,
    options?: {
      throw?: boolean;
    }
  ): void;
}

export const error: FrontityError = (message, options = {}) => {
  const doThrow = typeof options.throw !== "undefined" ? options.throw : true;
  if (process.env.NODE_ENV !== "production") {
    if (doThrow) throw new Error(message + suffix);
    console.error(message + suffix);
  } else {
    if (doThrow) throw new Error(message);
    console.error(message);
  }
};

export const warn = (message: string) => {
  if (process.env.NODE_ENV !== "production") {
    console.warn(message + suffix);
  }
};
