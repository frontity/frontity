const suffix = "\nVisit https://community.frontity.org for help! 🙂\n";

export const error = (message: string, doThrow = true) => {
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
