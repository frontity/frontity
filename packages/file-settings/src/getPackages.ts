import getSettings from "./getSettings";
import { Settings } from "./types";

// This function returns an array package names from the
// selected settings.
export default async ({
  name,
  url
}: {
  name?: string;
  url: string;
}): Promise<string[]> => {
  // Get the packages from the settings.
  const { packages }: Settings = await getSettings({ name, url });
  // Map the packages to an array of only package names.
  return packages.map(pkg => (typeof pkg === "string" ? pkg : pkg.name));
};
