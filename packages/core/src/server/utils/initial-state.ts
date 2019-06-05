import deepmerge from "deepmerge";
import { NormalizedSettings } from "@frontity/file-settings";
import { Package } from "@frontity/types";

export default ({
  settings,
  url
}: {
  settings: NormalizedSettings;
  url: URL;
}) => {
  let state: Package["state"] = {
    frontity: {
      name: settings.name,
      mode: settings.mode,
      platform: "server",
      initialLink: `${url.pathname}${url.search}${url.hash}`,
      packages: settings.packages.map(pkg => pkg.name)
    }
  };

  // Merge the initial state with the general state of settings.
  state = deepmerge(settings.state, state, {
    clone: false,
    arrayMerge: (dest, source) => source
  });

  // Merge the state with each package state, in order.
  settings.packages.forEach(pkg => {
    state = deepmerge(state, pkg.state, {
      clone: false,
      arrayMerge: (dest, source) => source
    });
  });

  return state;
};
