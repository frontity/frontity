import { Package } from "@frontity/types";
import deepmerge from "deepmerge";

// Remove some characters present in the npm package name to
// turn it into a variable name.
export const getVariable = (pkg: string, mode: string) => {
  return (
    pkg
      .replace(/^@/, "")
      .replace(/-/g, "_")
      .replace(/\//g, "__")
      .replace(/\./g, "___") + `_${mode}`
  );
};

// Merge all packages together in a single config that can be passed
// to createStore.
export const mergePackages = ({
  packages,
  state
}: {
  packages: {
    [name: string]: Package;
  };
  state: {
    frontity: {
      mode: string;
      packages: string[];
      [key: string]: any;
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
  packageExcludes.forEach(name => {
    const variable = getVariable(name, state.frontity.mode);
    config = deepmerge(config, packages[variable], { clone: false });
  });
  config.state = deepmerge(config.state, state);
  return config;
};
