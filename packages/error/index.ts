const isProduction = process.env.NODE_ENV === "production";
const suffix = "\n Visit https://community.frontity.org for help! 🙂\n";

export const error = (message: string, doThrow = true) => {
  if (!isProduction) {
    if (doThrow) throw new Error(message + suffix);
    console.error(message + suffix);
  } else {
    if (doThrow) throw new Error(message);
    console.error(message);
  }
};

export const warn = (message: string) => {
  if (!isProduction) {
    console.warn(message + suffix);
  }
};
