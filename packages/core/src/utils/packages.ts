// Remove some characters present in the npm package name to turn it into a variable name.
export const getVariable = (pkg: string, mode: string) => {
  return (
    pkg
      .replace(/^@/, "")
      .replace(/-/g, "_")
      .replace(/\//g, "__")
      .replace(/\./g, "___") + `_${mode}`
  );
};
