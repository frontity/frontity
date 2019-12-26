const isProduction: boolean = process.env.NODE_ENV === "production";
const prefix = "Visit https://community.frontity.org for help! 🙂\n\n";

// Throw an error if the condition fails
export function error(condition: boolean, message?: string) {
  if (condition) {
    return;
  }
  // Condition not passed

  if (isProduction) {
    throw new Error(prefix);
  } else {
    throw new Error(`${prefix}${message || ""}`);
  }
}

// Use a closure to ensure that the warning only shows up once!
export const warn = (() => {
  if (isProduction) {
    return;
  }
  let warned = false;

  return (message?: string) => {
    if (!warned) console.warn(`${prefix}${message || ""}`);
    warned = true;
  };
})();
