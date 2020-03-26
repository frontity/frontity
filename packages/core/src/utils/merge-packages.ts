import { Package } from "@frontity/types";
import deepmerge from "deepmerge";
import getVariable from "./get-variable";

type PackageFunction = () => Package;

// Callback that replaces arrays (to be used by deepmerge).
const overwriteMerge: deepmerge.Options["arrayMerge"] = (_, sourceArray) => {
  return sourceArray;
};

// Merge all packages together in a single config that can be passed
// to createStore.
export default ({
  packages,
  state,
  overwriteArrays = false,
}: {
  packages: {
    [name: string]: Package | PackageFunction;
  };
  state: Package["state"];
  overwriteArrays?: boolean;
}): Package => {
  let config: Package = {
    roots: {},
    fills: {},
    state: {},
    actions: {},
    libraries: {},
  };
  state.frontity.packages.forEach((name) => {
    const variable = getVariable(name, state.frontity.mode);
    const module = packages[variable];
    const pkg = typeof module === "function" ? module() : module;
    config = deepmerge(config, pkg, {
      clone: false,
    });
  });
  config.state = deepmerge(config.state, state, {
    clone: true,
    arrayMerge: overwriteArrays ? overwriteMerge : undefined,
  });
  delete config.name;
  return config;
};
