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
 * @param args - The sites, mode and configs.
 */
export const applyConfigurationFromPackages = async ({
  sites,
  mode,
  configs,
}) => {
  const packages = uniq(
    sites.reduce((out, site) => {
      return out.concat(site.packages);
    }, [])
  );

  for (const target in configs) {
    packages.forEach(async (name) => {
      const hasConfig = await packageHasConfig(name);

      if (hasConfig) {
        const packageConfig = (
          await import(createPath(name, "frontity.config"))
        ).default;

        if (packageConfig) {
          packageConfig({ config: configs[target], target, mode });
        }
      }
    });
  }
};
