import fs from "fs";
import path from "path";
import { AllSettings } from "./types";

// This function imports the available settings, either custom or default.
export const importSettingsFromFile = async (): Promise<AllSettings> => {
  // Path to the custom settings file.
  const customSettingsPath: string = process.cwd();
  // Path to the default settings file.
  const defaultSettingsPath: string = path.resolve(
    process.cwd(),
    "node_modules/@frontity/file-settings"
  );

  // Possible settings files and its priorities:
  // 1. Custom settings in TypeScript.
  // 2. Custom settings in JavaScript.
  // 3. Default settings in TypeScript.
  // 4. Default settings in JavaScript.
  const settingsPaths: string[] = [
    path.resolve(customSettingsPath, "frontity.settings.ts"),
    path.resolve(customSettingsPath, "frontity.settings.js"),
    path.resolve(defaultSettingsPath, "frontity.settings.ts"),
    path.resolve(defaultSettingsPath, "frontity.settings.js")
  ];

  // Available settings file.
  let settingsFile: string;

  // Loop over the possible settings files until one is available.
  for (let settingsPath of settingsPaths) {
    const fileExists: boolean = fs.existsSync(settingsPath);

    if (fileExists) {
      settingsFile = settingsPath;
      break;
    }
  }

  // Return the settings imported from the available file.
  return (await import(settingsFile)).default;
};
