import { uniq, uniqBy } from "ramda";
import { Settings, Package } from "./types";

// This function validates the packages.
const validatePackages = (packages: (string | Package)[]): void => {
  // Check that every package has a unique name.
  const uniquePackages = uniq(
    packages
      .map(pkg => (typeof pkg === "string" ? pkg : pkg.name))
      .filter(pkg => pkg)
  );
  if (uniquePackages.length < packages.length) {
    throw new Error("All the packages must have a unique name.");
  }
};

// This function is used to validate the imported settings.
export default (settings: Settings): void => {
  if (!Array.isArray(settings)) {
    // Validate packages in mono settings.
    validatePackages(settings.packages);
  }

  if (Array.isArray(settings)) {
    // Validate packages in multi settings.
    settings.forEach(s => validatePackages(s.packages));

    // Check that every multi settings has a unique name.
    const uniqueNames = uniqBy(s => s.name, settings.filter(s => s.name));
    if (uniqueNames.length < settings.length) {
      throw new Error("All the settings must have a unique name.");
    }
  }
};
