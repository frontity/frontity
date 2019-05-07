import { createStore } from "@frontity/connect";
import { MergedPackages } from "../types";
import { NormalizedSettings } from "@frontity/file-settings";
import deepmerge from "deepmerge";

export default ({
  merged,
  settings
}: {
  merged: MergedPackages;
  settings: NormalizedSettings;
}) => {
  const state = {
    settings: {
      frontity: {
        ...settings.settings,
        name: settings.name,
        mode: settings.mode
      }
    }
  };
  const store = createStore(deepmerge(merged, { state }));
  return store;
};
