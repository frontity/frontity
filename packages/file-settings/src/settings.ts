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
  // Import the custom or default settings.
  const allSettings: AllSettings = await importSettingsFromFile();

  // If `allSettings` is an object, return it as settings.
  if (!Array.isArray(allSettings)) return allSettings;

  // If `allSettings` is an array with only one element,
  // return that element as settings.
  if (allSettings.length === 1) return allSettings[0];

  // If `name` param is passed, use it to find the required settings.
  if (name) {
    const settings = allSettings.find(s => s.name === name);
    // If settings with that name were found, return them.
    if (settings) return settings;
  }

  // Collect all the matches of all the settings in one array.
  const allMatches = allSettings.reduce((final, current) => {
    if (current.matches) final = final.concat(current.matches);
    return final;
  }, []);

  // Filter the matches that match the `url` param and
  // sort them by length. Finally, pick the largest one
  // (as it should be the most specific match).
  const validMatch = allMatches
    .filter(match => new RegExp(match).test(url))
    .sort((a, b) => b.length - a.length)[0];

  // If a valid match was found return those settings.
  if (validMatch)
    return allSettings.find(
      settings => settings.matches && settings.matches.includes(validMatch)
    );

  // As a last resort, send the first settings without
  // a match defined in `AllSettings` or, if all of them have matches,
  // the first one in the array.
  return allSettings.filter(settings => !settings.matches)[0] || allSettings[0];
};
