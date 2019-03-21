import { mergeDeepRight as merge } from "ramda";
import { Settings, UniqueSettings, MultiSettings } from "./types";

const defaultSettings = {
  mode: "html",
  settings: {
    timezone: 0,
    language: "en"
  }
};

const mergeSettings = <T extends UniqueSettings | MultiSettings>({
  packages,
  ...settings
}: T): T =>
  merge(
    {
      ...defaultSettings,
      packages: packages.map(pkg =>
        merge({ active: true }, typeof pkg === "string" ? { name: pkg } : pkg)
      )
    },
    settings
  ) as T;

const normalizeSettings = (settings: Settings): Settings => {
  if (!Array.isArray(settings)) return mergeSettings(settings);
  return settings.map(s => mergeSettings(s));
  // TODO
  // Throw errors if multisettings is missing a name
  // or names are repeated.
  // Throw errors if packages is missing or is an empty array.
};

export default normalizeSettings;
export { mergeSettings };
