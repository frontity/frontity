import deepmerge from "deepmerge";
import { NormalizedSettings } from "@frontity/file-settings";

export default ({
  settings,
  url
}: {
  settings: NormalizedSettings;
  url: URL;
}) =>
  deepmerge(settings.state, {
    frontity: {
      name: settings.name,
      mode: settings.mode,
      initial: {
        path: (/^(.*)\/page\//.exec(url.pathname) || [null, url.pathname])[1],
        page: parseInt(
          (/\/page\/(\d+)\/?$/.exec(url.pathname) || [null, "1"])[1],
          10
        )
      },
      packages: settings.packages.map(pkg => pkg.name)
    }
  });
