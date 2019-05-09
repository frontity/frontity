import { NormalizedSettings } from "@frontity/file-settings";
import { Package } from "@frontity/types";
import deepmerge from "deepmerge";
import { PackageList } from "../types";

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
  state
}: {
  state: NormalizedSettings;
}): PackageList =>
  state.packages.map(pkg => ({
    name: pkg.name,
    variable: getVariable(pkg.name, state.mode)
  }));

export const mergePackages = ({
  packages,
  state
}: {
  packages: {
    [name: string]: Package;
  };
  state: {
    frontity: {
      packages: PackageList;
    };
  };
}): Package => {
  let config: Package = {
    roots: {},
    fills: {},
    state: {},
    actions: {}
  };
  const packageExcludes = state.frontity.packages;
  packageExcludes.forEach(pkg => {
    config = deepmerge(config, packages[pkg.variable], { clone: false });
  });
  config.state = deepmerge(config.state, state);
  return config;
};
