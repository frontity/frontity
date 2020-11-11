import { createStore, InitializedStore } from "@frontity/connect";
import { Package } from "@frontity/types";
import { NormalizedSettings } from "@frontity/file-settings";
import mergePackages from "../utils/merge-packages";
import initialState from "./utils/initial-state";

export default ({
  packages,
  settings,
  url,
}: {
  packages: {
    [name: string]: Package;
  };
  settings: NormalizedSettings;
  url: URL;
}): InitializedStore<Package> => {
  const state = initialState({ settings, url });
  const merged = mergePackages({ packages, state });
  const store = createStore(merged);
  return store;
};
