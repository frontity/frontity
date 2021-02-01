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
    state: {},
    actions: {},
    libraries: {
      frontity: {},
    },
  };
  state.frontity.packages.forEach((name) => {
    const variable = getVariable(name, state.frontity.mode);
    const module = packages[variable];
    const pkg = typeof module === "function" ? module() : module;
    config = deepmerge(config, pkg, {
      clone: false,
    });
  });
  // Save debug, which is the only value we want to retain.
  const debug = !!config.state?.frontity?.debug;
  // Merge the state from the packages with the initial state.
  config.state = deepmerge(config.state, state, {
    clone: true,
    arrayMerge: overwriteArrays ? overwriteMerge : undefined,
  });
  // Delete the name.
  delete config.name;
  // Restore the debug flag if we are not in production.
  if (process.env.NODE_ENV !== "production")
    config.state.frontity.debug = debug;

  return config;
};
