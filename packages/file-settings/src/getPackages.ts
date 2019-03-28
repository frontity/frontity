import importSettings from "./importSettings";
import { NormalizedSettings, Package } from "./types";

type Packages = {
  [key: string]: string[];
};

// This function returns an array package names from the
// selected settings.
export default async (): Promise<Packages> => {
  // Import the settings from a file.
  const allSettings: NormalizedSettings = await importSettings();

  // If mono settings return the packages in an object
  // with the `default` key.
  if (!Array.isArray(allSettings)) {
    const packages: string[] = allSettings.packages
      .filter((pkg: Package) => pkg.active)
      .map((pkg: Package) => pkg.name);

    return {
      default: packages
    };
  }

  // If multi settings return the packages in an object with
  // each settings name as a key and a value of its packages
  // as a string array.
  return allSettings.reduce((final, current) => {
    final[current.name] = current.packages
      .filter(pkg => pkg.active)
      .map(pkg => pkg.name);

    return final;
  }, {});
};
