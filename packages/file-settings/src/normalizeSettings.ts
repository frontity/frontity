import { mergeDeepRight as merge } from "ramda";
import {
  ImportedMono,
  ImportedMulti,
  ImportedSettings,
  NormalizedMono,
  NormalizedMulti,
  Settings
} from "./types";

const defaultSettings = {
  mode: "html",
  settings: {
    timezone: 0,
    language: "en"
  }
};

function mergeSettings(s: ImportedMulti): NormalizedMulti;
function mergeSettings(s: ImportedMono): NormalizedMono;

function mergeSettings({
  packages,
  ...settings
}: ImportedMulti | ImportedMono): NormalizedMulti | NormalizedMono {
  return merge(
    {
      ...defaultSettings,
      packages: packages.map(pkg =>
        merge({ active: true }, typeof pkg === "string" ? { name: pkg } : pkg)
      )
    },
    settings
  );
}

function normalizeSettings(settings: ImportedSettings): Settings {
  if (!Array.isArray(settings)) return mergeSettings(settings);
  return settings.map(s => mergeSettings(s));
  // TODO
  // Throw errors if multisettings is missing a name
  // or names are repeated.
  // Throw errors if packages is missing or is an empty array.
}

export default normalizeSettings;
export { mergeSettings };
