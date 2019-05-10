import merge from "ramda/src/mergeDeepRight";
import validateSettings from "./validateSettings";
import { NormalizedSettings } from "./types";
import Settings, {
  MultiSettings,
  MonoSettings
} from "@frontity/types/src/settings";

const defaultSettings = {
  name: "default",
  mode: "html",
  state: {}
};

const defaultPackage: {
  active: boolean;
  state: object;
} = {
  active: true,
  state: {}
};

// This function merges the imported settings with the default settings.
const mergeSettings = ({
  packages,
  ...settings
}: MultiSettings | MonoSettings): NormalizedSettings => ({
  ...merge(defaultSettings, settings),
  packages: packages.map(pkg =>
    typeof pkg === "string"
      ? {
          ...defaultPackage,
          name: pkg
        }
      : {
          ...defaultPackage,
          ...pkg
        }
  )
});

// This function normalizes the imported settings.
const normalizeSettings = (settings: Settings): NormalizedSettings[] => {
  // TODO
  // Default settings and validator from packages
  // should be imported and used with each package.

  // Validate settings before the merge.
  validateSettings(settings);
  // Merge mono settings.
  if (!Array.isArray(settings)) return [mergeSettings(settings)];
  // Merge multi settings.
  return settings.map(s => mergeSettings(s));
};

export default normalizeSettings;
