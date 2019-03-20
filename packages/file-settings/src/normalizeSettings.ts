import { merge } from "lodash";
import { Settings, Package, UniqueSettings, MultiSettings } from "./types";

const defaultPackage = {
  active: true
};

const defaultSettings = {
  mode: "html",
  settings: {
    timezone: 0,
    language: "en"
  },
  packages: []
};

export const normalizePackage = (pkg: string | Package): Package => {
  return merge(defaultPackage, typeof pkg === "string" ? { name: pkg } : pkg);
};

const normalizeSettings = (settings: Settings): Settings => {
  if (Array.isArray(settings)) {
    return settings.map(s => {
      const normalizedSettings: MultiSettings = merge(defaultSettings, s);
      normalizedSettings.packages = normalizedSettings.packages.map(
        normalizePackage
      );
      console.log("norm settings:", normalizedSettings);
      return normalizedSettings;
    });
  }

  const normalizedSettings: UniqueSettings = merge(defaultSettings, settings);
  normalizedSettings.packages = normalizedSettings.packages.map(
    normalizePackage
  );

  console.log("norm settings:", normalizedSettings);

  return settings;
};

export default normalizeSettings;
