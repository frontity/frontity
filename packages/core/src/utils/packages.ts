import { NormalizedSettings } from "@frontity/file-settings";
import Package from "@frontity/types/package";
import { MergedPackages } from "../types";

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

export const getMerged = ({
  packages,
  settings
}: {
  packages: {
    [name: string]: Package;
  };
  settings: NormalizedSettings;
}): MergedPackages => {
  const iterate = settings.packages.map(pkg => ({
    name: getVariable(pkg.name, settings.mode),
    exclude: pkg.exclude
  }));
  const config: MergedPackages = {
    roots: [],
    fills: [],
    state: {}
  };
  iterate.forEach(pkg => {
    if (packages[pkg.name].roots) {
      Object.entries(packages[pkg.name].roots).forEach(([namespace, Root]) => {
        if (pkg.exclude.indexOf(namespace) === -1) {
          config.roots.push({ name: pkg.name, Root });
        }
      });
    }
    if (packages[pkg.name].fills) {
      Object.entries(packages[pkg.name].fills).forEach(([namespace, Fill]) => {
        if (pkg.exclude.indexOf(namespace) === -1) {
          config.fills.push({ name: pkg.name, Fill });
        }
      });
    }
  });
  return config;
};
