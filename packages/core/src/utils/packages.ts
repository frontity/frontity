import { NormalizedSettings } from "@frontity/file-settings";

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

export const isNotExcluded = (options: {
  settings: NormalizedSettings;
  package: string;
  namespace: string;
}): boolean => {
  const { settings, package: pkg, namespace } = options;
  return false;
};
