import { Settings } from "./types";
import { importSettingsFromFile } from "./utils";

export default async ({
  name,
  url
}: {
  name: string;
  url: string;
}): Promise<Settings> => {
  const allSettings = await importSettingsFromFile();

  let settings: Settings;

  if (Array.isArray(allSettings)) {
    settings = allSettings[0];
  } else {
    settings = allSettings;
  }

  return settings;
};
