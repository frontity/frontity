import normalizeSettings from "./normalizeSettings";
import { NormalizedSettings } from "./types";

// This function imports the the settings from a file.
export default async (): Promise<NormalizedSettings[]> => {
  const { default: settings } = await import(process.env.CWD +
    "/frontity.settings");

  return normalizeSettings(settings);
};
