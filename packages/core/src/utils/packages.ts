import { NormalizedSettings } from "@frontity/file-settings";
import Package from "@frontity/types/package";
import deepmerge from "deepmerge";
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
    name: pkg.name,
    exclude: pkg.exclude
  }));
  const config: MergedPackages = {
    roots: [],
    fills: [],
    state: {
      settings: {
        frontity: {
          packages: iterate
        }
      }
    },
    actions: {}
  };
  iterate.forEach(pkg => {
    const name = getVariable(pkg.name, settings.mode);
    if (packages[name].roots) {
      Object.entries(packages[name].roots).forEach(([namespace, Root]) => {
        if (pkg.exclude.indexOf(namespace) === -1) {
          config.roots.push({ name: name, Root });
        }
      });
    }
    if (packages[name].fills) {
      Object.entries(packages[name].fills).forEach(([namespace, Fill]) => {
        if (pkg.exclude.indexOf(namespace) === -1) {
          config.fills.push({ name: name, Fill });
        }
      });
    }
    if (packages[name].state) {
      Object.entries(packages[name].state).forEach(([namespace, state]) => {
        if (pkg.exclude.indexOf(namespace) === -1) {
          config.state = deepmerge(
            config.state,
            { [namespace]: state },
            { clone: false }
          );
        }
      });
    }
    if (packages[name].actions) {
      Object.entries(packages[name].actions).forEach(([namespace, actions]) => {
        if (pkg.exclude.indexOf(namespace) === -1) {
          config.actions = deepmerge(
            config.actions,
            { [namespace]: actions },
            { clone: false }
          );
        }
      });
    }
  });
  return config;
};
