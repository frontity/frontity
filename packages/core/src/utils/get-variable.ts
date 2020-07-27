/**
 * Create a valid variable name out of a package name and a mode.
 *
 * @param pkg - The package name, like for example `@frontity/mars-theme`.
 * @param mode - The mode, like for example `default` or `amp`.
 *
 * @returns A valid variable name that can be used to create the entry point
 * files.
 */
export default (pkg: string, mode: string) => {
  return (
    // "_" +
    pkg
      .replace(/^@/, "")
      .replace(/^(\d)/, "_$1")
      .replace(/-/g, "_")
      .replace(/\//g, "__")
      .replace(/\./g, "___") + `_${mode}`
  );
};
