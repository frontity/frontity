import { AllSettings, Settings } from "./types";
import { importSettingsFromFile } from "./utils";
import settings from "../frontity.settings";

// This function returns the settings required by
// the `core` package.
export default async ({
  name,
  url
}: {
  name?: string;
  url: string;
}): Promise<Settings> => {
  // Import the custom or default settings from a file.
  const allSettings: AllSettings = await importSettingsFromFile();

  // 1. Return settings when `allSettings` is an object.
  if (!Array.isArray(allSettings)) return allSettings;

  // 2. Return settings when `allSettings` is an array of only
  // one element.
  if (allSettings.length === 1) return allSettings[0];

  // 3. Return settings when `name` param is passed and exist
  // settings with that name.
  if (name) {
    const settings = allSettings.find(s => s.name === name);
    if (settings) return settings;
  }

  // 4. Return settings when `matches` match the param `url`.
  const validMatch = allSettings
    // Get all matches in one array.
    .reduce((final, current) => {
      if (current.matches) final = final.concat(current.matches);
      return final;
    }, [])
    // Filter them to get only the ones that match the `url`
    .filter(match => new RegExp(match).test(url))
    // Sort them by length and pick the longest one.
    .sort((a, b) => b.length - a.length)[0];
  // If a valid match was found return those settings.
  if (validMatch)
    return allSettings.find(
      settings => settings.matches && settings.matches.includes(validMatch)
    );

  // 5. Return the first settings without a match defined or,
  // if all of them have matches, the first settings in the array.
  return allSettings.filter(settings => !settings.matches)[0] || allSettings[0];
};
