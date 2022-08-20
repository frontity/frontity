import { Package } from "@frontity/types";
import deepmerge from "deepmerge";
import getVariable from "./get-variable";

/**
 * A package function.
 *
 * @returns The package settings.
 */
type PackageFunction = () => Package;

/**
 *
 * Overwrites the merge config for deep merge.
 *
 * @param _ - The target array which is ignored.
 * @param sourceArray - The Array to be returned.
 *
 * @returns The source array.
 */
const overwriteMerge: deepmerge.Options["arrayMerge"] = (_, sourceArray) => {
  return sourceArray;
};

/**
 * Type for parameters of the {@link mergePackages} function.
 */
interface MergePackages {
  /**
   * The packages interface to be used.
   */
  packages: {
    [name: string]: Package | PackageFunction;
  };

  /**
   * The state entry.
   */
  state: Package["state"];

  /**
   * The flag for overwritting the arrays.
   */
  overwriteArrays?: boolean;
}

/**
 * Merge all packages together in a single config that can be passed
 * to createStore.
 *
 * @param params - Defined in {@link MergePackages}.
 *
 * @returns A Frontity package that can be passed to the {@link createStore} function.
 */
const mergePackages = ({
  packages,
  state,
  overwriteArrays = false,
}: MergePackages): Package => {
  let config: Package = {
    roots: {},
    state: {},
    actions: {},
    libraries: {
      frontity: {},
    },
    server: {},
  };
  state.frontity.packages.forEach((name) => {
    const variable = getVariable(name, state.frontity.mode);
    const module = packages[variable];

    // If module exist extend the base config.
    if (module) {
      const pkg = typeof module === "function" ? module() : module;
      config = deepmerge(config, pkg, {
        clone: false,
      });
    }
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

export default mergePackages;
