import { Package } from "@frontity/types";
import deepmerge from "deepmerge";
import getVariable from "./get-variable";

type PackageFunction = () => Package;

// Merge all packages together in a single config that can be passed
// to createStore.
export default ({
  packages,
  state
}: {
  packages: {
    [name: string]: Package | PackageFunction;
  };
  state: Package["state"];
}): Package => {
  let config: Package = {
    roots: {},
    fills: {},
    state: {},
    actions: {},
    libraries: {}
  };
  state.frontity.packages.forEach(name => {
    const variable = getVariable(name, state.frontity.mode);
    const module = packages[variable];
    const pkg = typeof module === "function" ? module() : module;
    config = deepmerge(config, pkg, { arrayMerge: (dest, source) => source });
  });
  config.state = deepmerge(config.state, state, {
    arrayMerge: (dest, source) => source
  });
  return config;
};
