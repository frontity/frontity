import importSettings from "./importSettings";
import { Settings, Packages, Package } from "./types";

// This function returns an array package names from the
// selected settings.
export default async (): Promise<Packages> => {
  // Import the settings from a file.
  const allSettings: Settings = await importSettings();

  // If mono settings settings return the packages in an object
  // with the `default` key.
  if (!Array.isArray(allSettings)) {
    const packages: string[] = allSettings.packages
      .filter((pkg: Package) => pkg.active)
      .map((pkg: Package) => pkg.name);

    return {
      default: packages
    };
  }

  // Map the packages to an array of only package names.
  // return packages.map(pkg => (typeof pkg === "string" ? pkg : pkg.name));
  return {};
};
