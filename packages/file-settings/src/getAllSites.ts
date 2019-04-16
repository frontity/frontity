import importSettings from "./importSettings";
import { NormalizedSettings, Site } from "./types";

export default async (): Promise<Site[]> => {
  // Import the settings from a file.
  const allSettings: NormalizedSettings[] = await importSettings();

  // Return only name, mode and packages in an array of sites.
  return allSettings.map(({ name, mode, packages }) => ({
    name,
    mode,
    packages: packages
      .filter(pkg => pkg.active)
      .map(pkg => ({
        name: pkg.name,
        namespaces: pkg.namespaces || []
      }))
  }));
};
