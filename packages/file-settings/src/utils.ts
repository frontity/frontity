import fs from "fs";
import path from "path";
import { AllSettings } from "./types";
import defaultSettings from "../frontity.settings";

// This function imports the available settings, either custom or default.
export const importSettingsFromFile = async (): Promise<AllSettings> => {
  // Define custom settings file path.
  const settingsFile: string = path.resolve(process.cwd(), "frontity.settings");

  // Check if the custom settings file exists.
  const fileExists: boolean =
    fs.existsSync(settingsFile + ".ts") || fs.existsSync(settingsFile + ".js");

  // Return custom settings if possible.
  if (fileExists) return (await import(settingsFile)).default;

  // Return default settings otherwise.
  return defaultSettings;
};
