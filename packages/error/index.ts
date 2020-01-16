const isProduction: boolean = process.env.NODE_ENV === "production";
const suffix = "Visit https://community.frontity.org for help! 🙂";

export const error = (message: string) => {
  if (!isProduction) {
    console.error(message + "\n" + suffix);
  }
};

export const warn = (message: string) => {
  if (!isProduction) {
    console.warn(message + "\n" + suffix);
  }
};
