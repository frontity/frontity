import merge from "ramda/src/mergeDeepRight";
import validateSettings from "./validateSettings";
import { NormalizedSettings } from "../types";
import { Settings } from "@frontity/types";
import { MultiSettings, MonoSettings } from "@frontity/types/settings";

/**
 * The default settings of a site.
 */
const defaultSettings = {
  name: "default",
  mode: "default" as const,
  state: {},
};

/**
 * The default state of a package.
 */
const defaultPackage: {
  /**
   * Whether the package is active or not.
   */
  active: boolean;

  /**
   * The state that is merged when the package is active.
   */
  state: Record<string, unknown>;
} = {
  active: true,
  state: {},
};

/**
 * Merge the imported settings with the default settings.
 *
 * @param options - The settings. Usually defined in the `frontity.settings.js`
 * file.
 *
 * @returns The settings, after being merged with the defaults.
 */
const mergeSettings = ({
  packages,
  ...settings
}: MultiSettings | MonoSettings): NormalizedSettings => ({
  ...merge(defaultSettings, settings),
  packages: packages.map((pkg) =>
    typeof pkg === "string"
      ? {
          ...defaultPackage,
          name: pkg,
        }
      : {
          ...defaultPackage,
          ...pkg,
        }
  ),
});

/**
 * Normalize the imported settings.
 *
 * @param settings - The settings of the Frontity project. Usually defined in
 * the `frontity.settings.js` file.
 *
 * @returns The normalized settings.
 */
const normalizeSettings = (settings: Settings): NormalizedSettings[] => {
  // Validate settings before the merge.
  validateSettings(settings);

  // Merge mono settings.
  if (!Array.isArray(settings)) return [mergeSettings(settings)];

  // Merge multi settings.
  return settings.map((s) => mergeSettings(s));
};

export default normalizeSettings;
