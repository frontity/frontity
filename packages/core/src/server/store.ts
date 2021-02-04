import { createStore, InitializedStore } from "@frontity/connect";
import { Package } from "@frontity/types";
import { NormalizedSettings } from "@frontity/file-settings";
import mergePackages from "../utils/merge-packages";
import initialState from "./utils/initial-state";

/**
 * Params for {@link store}.
 */
type StoreParams = {
  /**
   * A map of Frontity package names to their full configuration.
   */
  packages: {
    [name: string]: Package;
  };

  /**
   * The user-defined state and actions. This parameter typically comes from the
   * settings defined in a `frontity.settings.(js|ts)` file.
   */
  settings: NormalizedSettings;

  /**
   * The URL of the Frontity site that points to the Frontity application (not
   * the WordPress backend).
   */
  url: URL;
};

/**
 * Create a reactive Frontity store.
 *
 * @param params - Defined in {@link StoreParams}.
 *
 * @returns An object that contains the state, actions, roots and libraries of a
 * Frontity application.
 */
const store = ({
  packages,
  settings,
  url,
}: StoreParams): InitializedStore<Package> => {
  const state = initialState({ settings, url });
  const merged = mergePackages({ packages, state });
  const store = createStore(merged);
  return store;
};

export default store;
