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

interface PackageExclude {
  name: string;
  variable: string;
  exclude: string[];
}

export const getPackageExcludes = ({
  settings
}: {
  settings: NormalizedSettings;
}): PackageExclude[] =>
  settings.packages.map(pkg => ({
    name: pkg.name,
    variable: getVariable(pkg.name, settings.mode),
    exclude: pkg.exclude
  }));

export const getMergedServer = ({
  packages,
  settings
}: {
  packages: {
    [name: string]: Package;
  };
  settings: NormalizedSettings;
}): MergedPackages => {
  const packageExcludes = getPackageExcludes({ settings });
  const config: MergedPackages = {
    roots: [],
    fills: [],
    state: {
      settings: {
        frontity: {
          packages: packageExcludes
        }
      }
    },
    actions: {}
  };
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
    if (packages[pkg.variable].state) {
      Object.entries(packages[pkg.variable].state).forEach(
        ([namespace, state]) => {
          if (pkg.exclude.indexOf(namespace) === -1) {
            config.state = deepmerge(
              config.state,
              { [namespace]: state },
              { clone: false }
            );
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
  });
  return config;
};

export const getMergedClient = ({
  packages,
  state
}: {
  packages: {
    [name: string]: Package;
  };
  state: {
    settings: {
      frontity: {
        packages: PackageExclude[];
      };
    };
  };
}): MergedPackages => {
  const packageExcludes = state.settings.frontity.packages;
  const config: MergedPackages = {
    roots: [],
    fills: [],
    state,
    actions: {}
  };
  packageExcludes.forEach(pkg => {
    if (packages[pkg.variable].roots) {
      Object.entries(packages[pkg.variable].roots).forEach(
        ([namespace, Root]) => {
          if (pkg.exclude.indexOf(namespace) === -1) {
            config.roots.push({ name: name, Root });
          }
        }
      );
    }
    if (packages[pkg.variable].fills) {
      Object.entries(packages[pkg.variable].fills).forEach(
        ([namespace, Fill]) => {
          if (pkg.exclude.indexOf(namespace) === -1) {
            config.fills.push({ name: name, Fill });
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
  });
  return config;
};
