const isProduction: boolean = process.env.NODE_ENV === "production";
const prefix = "Visit https://community.frontity.org for help! 🙂\n";

// Throw an error if the condition fails
export function invariant(condition: boolean, message: string | undefined) {
  if (!condition) {
    let error: Error;
    if (message === undefined) {
      error = new Error(
        "Minified exception occurred; use the non-minified dev environment " +
          "for the full error message and additional helpful warnings."
      );
    } else {
      error = new Error(prefix + message);
    }
    error.name = "Invariant failed";
    throw error;
  }
}

export const warning = (message: string) => {
  if (isProduction) {
    return;
  } else {
    console.warn(`${prefix}${message || ""}`);
  }
};
