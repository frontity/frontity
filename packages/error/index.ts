const isProduction: boolean = process.env.NODE_ENV === "production";
const prefix = "Visit https://community.frontity.org for help! 🙂\n\n";

// Throw an error if the condition fails
// Strip out error messages for production
// > Not providing an inline default argument for message as the result is smaller
export function error(condition: boolean, message?: string) {
  if (condition) {
    return;
  }
  // Condition not passed

  if (isProduction) {
    // In production we strip the message but still throw
    throw new Error(prefix);
  } else {
    // When not in production we allow the message to pass through
    // *This block will be removed in production builds*
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
