import { Package } from "@frontity/types";
import deepmerge from "deepmerge";
import getVariable from "./get-variable";

type PackageFunction = ({
  libraries
}: {
  libraries: Package["libraries"];
}) => Package;

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
    actions: {}
  };
  const args: {
    libraries: Package["libraries"];
  } = {
    libraries: {}
  };
  const packageExcludes = state.frontity.packages;
  packageExcludes.forEach(name => {
    const variable = getVariable(name, state.frontity.mode);
    const module = packages[variable];
    const pkg = typeof module === "function" ? module(args) : module;
    config = deepmerge(config, pkg, { clone: false });
  });
  config.state = deepmerge(config.state, state);
  if (config.libraries)
    Object.keys(config.libraries).forEach(namespace => {
      args.libraries[namespace] = config.libraries[namespace];
    });
  return config;
};
