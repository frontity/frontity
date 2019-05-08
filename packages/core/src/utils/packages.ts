import { NormalizedSettings } from "@frontity/file-settings";
import Package from "@frontity/types/package";
import deepmerge from "deepmerge";
import { MergedPackages, PackageList } from "../types";

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

export const packageList = ({
  settings
}: {
  settings: NormalizedSettings;
}): PackageList =>
  settings.packages.map(pkg => ({
    name: pkg.name,
    variable: getVariable(pkg.name, settings.mode),
    exclude: pkg.exclude
  }));

export const mergePackages = ({
  packages,
  state
}: {
  packages: {
    [name: string]: Package;
  };
  state: {
    settings: {
      frontity: {
        packages: PackageList;
      };
    };
  };
}): MergedPackages => {
  const config: MergedPackages = {
    roots: [],
    fills: [],
    state: {
      settings: {}
    },
    actions: {}
  };
  const packageExcludes = state.settings.frontity.packages;
  packageExcludes.forEach(pkg => {
    if (packages[pkg.variable].roots) {
      Object.entries(packages[pkg.variable].roots).forEach(
        ([namespace, Root]) => {
          if (pkg.exclude.indexOf(namespace) === -1) {
            config.roots.push({ name: pkg.variable, Root });
          }
        }
      );
    }
    if (packages[pkg.variable].fills) {
      Object.entries(packages[pkg.variable].fills).forEach(
        ([namespace, Fill]) => {
          if (pkg.exclude.indexOf(namespace) === -1) {
            config.fills.push({ name: pkg.variable, Fill });
          }
        }
      );
    }
    if (packages[pkg.variable].actions) {
      Object.entries(packages[pkg.variable].actions).forEach(
        ([namespace, actions]) => {
          if (pkg.exclude.indexOf(namespace) === -1) {
            config.actions = deepmerge(
              config.actions,
              { [namespace]: actions },
              { clone: false }
            );
          }
        }
      );
    }
    if (packages[pkg.variable].state) {
      Object.entries(packages[pkg.variable].state).forEach(
        ([namespace, state]) => {
          if (namespace === "settings") {
            Object.entries(state).forEach(
              ([settingsNamespace, settingsState]) => {
                if (pkg.exclude.indexOf(settingsNamespace) === -1) {
                  config.state.settings = deepmerge(
                    config.state.settings,
                    { [settingsNamespace]: settingsState },
                    { clone: false }
                  );
                }
              }
            );
          } else if (pkg.exclude.indexOf(namespace) === -1) {
            config.state = deepmerge(
              config.state,
              { [namespace]: state },
              { clone: false }
            );
          }
        }
      );
    }
  });
  config.state = deepmerge(config.state, state);
  return config;
};
