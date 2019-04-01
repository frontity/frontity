import { mergeDeepRight as merge } from "ramda";
import validateSettings from "./validateSettings";
import {
  Settings,
  NormalizedSettings,
  MultiSettings,
  MonoSettings
} from "./types";

const defaultSettings = {
  name: "default",
  mode: "html",
  settings: {
    timezone: 0,
    language: "en"
  }
};

const defaultPackage = {
  active: true
};

// This function merges the imported settings with
// the default settings.
function mergeSettings({
  packages,
  ...settings
}: MultiSettings | MonoSettings): NormalizedSettings {
  return merge(
    {
      ...defaultSettings,
      packages: packages.map(pkg =>
        merge(defaultPackage, typeof pkg === "string" ? { name: pkg } : pkg)
      )
    },
    settings
  );
}

// This function normalizes the imported settings.
function normalizeSettings(settings: Settings): NormalizedSettings[] {
  // TODO
  // Default settings and validator from packages
  // should be imported and used with each package.

  // Validate settings before the merge.
  validateSettings(settings);
  // Merge mono settings.
  if (!Array.isArray(settings)) return [mergeSettings(settings)];
  // Merge multi settings.
  return settings.map(s => mergeSettings(s));
}

export default normalizeSettings;
