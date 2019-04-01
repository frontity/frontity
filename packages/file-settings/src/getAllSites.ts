import importSettings from "./importSettings";
import { NormalizedSettings } from "./types";

type Packages = {
  name: string;
  mode: string;
  packages: string[];
};

// This function returns an array package names from the
// selected settings.
export default async (): Promise<Packages[]> => {
  // debugger;

  // Import the settings from a file.
  const allSettings: NormalizedSettings[] = await importSettings();

  // Return the packages in an object with
  // each settings name as a key and a value of its packages
  // as a string array.
  return allSettings.map(({ name, mode, packages }) => ({
    name,
    mode,
    packages: packages.map(pkg => pkg.name)
  }));
};
