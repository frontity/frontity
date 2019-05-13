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
  const state: Package["state"] = {
    frontity: {
      name: settings.name,
      mode: settings.mode,
      platform: "server",
      initial: {
        path: (/^(.*)\/page\//.exec(url.pathname) || [null, url.pathname])[1],
        page: parseInt(
          (/\/page\/(\d+)\/?$/.exec(url.pathname) || [null, "1"])[1],
          10
        )
      },
      packages: settings.packages.map(pkg => pkg.name)
    }
  };
  return deepmerge(settings.state, state);
};
