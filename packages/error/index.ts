const isProduction: boolean = process.env.NODE_ENV === "production";
const suffix = "Visit https://community.frontity.org for help! 🙂";

export const error = (message: string, doThrow = true) => {
  if (!isProduction) {
    if (doThrow) throw new Error(message + suffix);
    console.error(message + suffix);
  } else {
    if (doThrow) throw new Error("Minified error...");
    console.error("Minified error...");
  }
};

export const warn = (message: string) => {
  if (!isProduction) {
    console.warn(message + "\n" + suffix);
  }
};
