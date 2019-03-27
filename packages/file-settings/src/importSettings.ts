import fs from "fs";
import path from "path";
import normalizeSettings from "./normalizeSettings";
import { Settings } from "./types";

// This function imports the the settings from a file.
export default async (): Promise<Settings> => {
  // Define settings file path.
  const settingsFile: string = path.resolve(process.cwd(), "frontity.settings");

  // Check if the settings file exists.
  const fileExists: boolean =
    fs.existsSync(settingsFile + ".ts") || fs.existsSync(settingsFile + ".js");

  // Return settings if possible.
  if (fileExists)
    return normalizeSettings((await import(settingsFile)).default);

  // Throw an error if settings file doesn't exist.
  throw new Error("A Frontity settings file doesn't exist.");
};
