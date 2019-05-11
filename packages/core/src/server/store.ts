import { createStore } from "@frontity/connect";
import { Package } from "@frontity/types";
import { NormalizedSettings } from "@frontity/file-settings";
import { mergePackages } from "../utils/packages";
import deepmerge from "deepmerge";

export default ({
  packages,
  settings
}: {
  packages: {
    [name: string]: Package;
  };
  settings: NormalizedSettings;
}) => {
  const state = deepmerge(settings.state, {
    frontity: {
      name: settings.name,
      mode: settings.mode,
      packages: settings.packages.map(pkg => pkg.name)
    }
  });
  const merged = mergePackages({ packages, state });
  const store = createStore(merged);
  return store;
};
