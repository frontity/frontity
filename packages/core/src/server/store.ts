import { createStore } from "@frontity/connect";
import Package from "@frontity/types/package";
import { NormalizedSettings } from "@frontity/file-settings";
import { mergePackages, packageList } from "../utils/packages";

export default ({
  packages,
  settings
}: {
  packages: {
    [name: string]: Package;
  };
  settings: NormalizedSettings;
}) => {
  const state = {
    settings: {
      frontity: {
        ...settings.settings,
        name: settings.name,
        mode: settings.mode,
        packages: packageList({ settings })
      }
    }
  };
  const merged = mergePackages({ packages, state });
  const store = createStore(merged);
  return store;
};
