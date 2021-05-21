import { Site } from "@frontity/file-settings/types";
import { pathExists } from "fs-extra";
import { uniq } from "lodash";

/**
 * Creates string that represents a package path.
 *
 * @param name - The package name.
 * @param file - The file name.
 * @returns The path.
 */
const createPath = (name, file) =>
  `${process.env.CWD}/node_modules/${name}/${file}`;

/**
 * Checks if a given package has a configuration file.
 *
 * @param name - The package name.
 * @returns If a package has a configuration file.
 */
const packageHasConfig = async (name) => {
  return (
    (await pathExists(createPath(name, "frontity.config.ts"))) ||
    (await pathExists(createPath(name, "frontity.config.js")))
  );
};

/**
 * This function applies the configuration from packages.
 *
 * @param sites - The sites.
 * @returns A dictionary split by the exported configuration function.
 */
export const readConfigurationsFromConfigFiles = async (
  sites: Site[]
): Promise<Record<string, []>> => {
  const packages = uniq(
    sites.reduce((out, site) => {
      return out.concat(site.packages);
    }, [])
  );
  const dictionary = {};

  for (const i in packages) {
    const name = packages[i];
    const hasConfig = await packageHasConfig(name);

    if (hasConfig) {
      const packageConfig = await import(
        `${process.env.CWD}/node_modules/${name}/frontity.config`
      );

      if (packageConfig) {
        // For each configuration exported
        for (const config in packageConfig) {
          dictionary[config] = dictionary[config] || [];

          // Push the current configuration function into the
          // config dictionary
          dictionary[config].push(packageConfig[config]);
        }
      }
    }
  }

  return dictionary;
};
