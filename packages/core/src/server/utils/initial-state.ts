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
      initial: {
        path: (/^(.*)page\/\d+\/?$/.exec(url.pathname) || [
          null,
          url.pathname
        ])[1],
        page: parseInt(
          (/^.*page\/(\d+)\/?$/.exec(url.pathname) || [null, "1"])[1],
          10
        )
      },
      packages: settings.packages.map(pkg => pkg.name)
    }
  };

  // Merge the initial state with the general state of settings.
  state = deepmerge(settings.state, state, {
    clone: false
  });

  // Merge the state with each package state, in order.
  settings.packages.forEach(pkg => {
    state = deepmerge(state, pkg.state, {
      clone: false
    });
  });

  return state;
};
