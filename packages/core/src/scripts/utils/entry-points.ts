import { resolve } from "path";
import { writeFile, ensureDir, pathExists } from "fs-extra";
import { flatten, uniqBy, uniq } from "lodash";
import { Site } from "@frontity/file-settings";
import { EntryPoints } from "../../../types";
import { Mode } from "@frontity/types/config";
import getVariable from "../../utils/get-variable";
import entryExists from "./entry-exists";

/**
 * The name and location of a Frontity package.
 */
interface Package {
  /**
   * The name of the package.
   *
   * @example `@frontity/wp-source`
   */
  name: string;

  /**
   * The mode of that package.
   *
   * @example "amp"
   *
   * @defaultValue "default"
   */
  mode: string;

  /**
   * The path on the filesystem for that package.
   */
  path?: string;
}

/**
 * The type of bundle that needs to be generated.
 */
type Type = "client" | "server";

/**
 * The options of the {@link entryPoint} function.
 */
interface EntryPointOptions extends Package {
  /**
   * The type of bundle that needs to be generated.
   */
  type: Type;
}

/**
 * The options of the {@link checkForPackages} helper.
 */
interface CheckForPackagesOptions {
  /**
   * The list of sites included in the settings.
   */
  sites: Site[];
}

/**
 * The options of the {@link getPackagesList} helper.
 */
interface GetPackagesListOptions {
  /**
   * The list of sites included in the settings.
   */
  sites: Site[];

  /**
   * The type of bundle that needs to be generated.
   */
  type: Type;
}

/**
 * The options of the {@link generateImportsTemplate} helper.
 */
interface GenerateImportsTemplateOptions {
  /**
   * The list of packages of that site.
   */
  packages: Package[];

  /**
   * The type of bundle that needs to be generated.
   */
  type: Type;
}

/**
 * The options of the {@link generateHotModuleTemplate} helper.
 */
interface GenerateHotModuleTemplateOptions {
  /**
   * The list of packages of that site.
   */
  packages: Package[];

  /**
   * The template parts that have been generated previously.
   */
  template: string;
}

/**
 * The options of the {@link generateServerEntryPoint} helper.
 */
interface GenerateServerEntryPointOptions {
  /**
   * The list of sites included in the settings.
   */
  sites: Site[];

  /**
   * The output directory where the bundle will be generated.
   */
  outDir: string;
}

/**
 * The options of the {@link generateClientEntryPoints} helper.
 */
interface GenerateEntryPointsOptions {
  /**
   * The list of sites included in the settings.
   */
  sites: Site[];

  /**
   * The output directory where the bundle will be generated.
   */
  outDir: string;

  /**
   * The mode used for the site.
   */
  mode: Mode;
}

/**
 * Resolve the path of a package.
 *
 * @param options - Defined in {@link EntryPointOptions}.
 * @returns The path of the package.
 */
export const entryPoint = async ({
  name,
  mode,
  type,
}: EntryPointOptions): Promise<string> => {
  let extension: string | false = false;
  if (mode !== "default") {
    // Check first inside the mode and in the type.
    extension = await entryExists(`${name}/src/${mode}/${type}`);
    if (extension) return `${name}/src/${mode}/${type}`;
    // Check first inside the mode and in the type but in a folder.
    extension = await entryExists(`${name}/src/${mode}/${type}/index`);
    if (extension) return `${name}/src/${mode}/${type}/index`;
    // If it's client or server, check on index as well.
    if (type === "client" || type === "server") {
      // Check if it's a file.
      extension = await entryExists(`${name}/src/${mode}`);
      if (extension) {
        return `${name}/src/${mode}`;
      }
      // Check if it's a folder.
      extension = await entryExists(`${name}/src/${mode}/index`);
      if (extension) {
        return `${name}/src/${mode}/index`;
      }
    }
  }
  // Check now outside of the mode for the specific type.
  extension = await entryExists(`${name}/src/${type}`);
  if (extension) return `${name}/src/${type}`;
  // Check now outside of the mode for the specific type but in a folder.
  extension = await entryExists(`${name}/src/${type}/index`);
  if (extension) return `${name}/src/${type}/index`;
  // And finally, if it's client or server, check on index as well.
  extension = await entryExists(`${name}/src/index`);
  if ((type === "client" || type === "server") && extension) {
    return `${name}/src/index`;
  }
  // Don't return path if no entry point is found.
  return "";
};

/**
 * Throw an error if any of the packages defined in the settings is not
 * installed.
 *
 * @param options - Defined in {@link CheckForPackagesOptions}.
 */
export const checkForPackages = async ({
  sites,
}: CheckForPackagesOptions): Promise<void> => {
  // Turn the list into an array of package names.
  const packages = uniq(flatten(sites.map((site) => site.packages)));
  await Promise.all(
    // Iterate over the packages.
    packages.map(async (name) => {
      // Check if the folder exists.
      const exists = await pathExists(
        resolve(process.cwd(), "node_modules", name)
      );
      if (!exists)
        throw new Error(
          `The package "${name}" doesn't seem to be installed. Make sure you did "npm install ${name}"`
        );
    })
  );
};

/**
 * Turn a list of sites into a list of packages that can be used to create the
 * templates.
 *
 * @param options - Defined in {@link GetPackagesListOptions}.
 * @returns The list of packages for each site.
 */
const getPackagesList = async ({
  sites,
  type,
}: GetPackagesListOptions): Promise<Package[]> => {
  // Get a flat array of unique packages and its modes.
  const packages = uniqBy(
    flatten(
      sites.map((site) =>
        site.packages.map((name) => ({ mode: site.mode, name }))
      )
    ),
    ({ mode, name }) => `${mode}${name}`
  );
  return (
    await Promise.all(
      // Iterate over the packages.
      packages.map(async ({ name, mode }) => {
        // Check if the entry point of that mode exists.
        const path = await entryPoint({ name, mode, type });
        return { name, mode, path };
      })
      // Remove the packages where the entry point doesn't exist.
    )
  ).filter(({ path }) => path !== "");
};

/**
 * Generate the template part that contains the imports section.
 *
 * @param options - Defined in {@link GenerateImportsTemplateOptions}.
 * @returns The template part.
 */
const generateImportsTemplate = ({
  packages,
  type,
}: GenerateImportsTemplateOptions): string => {
  let template = `import ${type} from "@frontity/core/src/${type}";\n`;
  // Create the "import" part of the file.
  packages.forEach(
    ({ name, mode, path }) =>
      (template += `import ${getVariable(name, mode)} from "${path}";\n`)
  );
  // Create the "const packages = {...}" part of the file.
  template += "\nconst packages = {\n";
  packages.forEach(
    ({ name, mode }) => (template += `  ${getVariable(name, mode)},\n`)
  );
  template += "};\n\n";
  template += `export default ${type}({ packages });\n\n`;
  return template;
};

/**
 * Generate the template part that contains the HMR section.
 *
 * @param options - Defined in {@link GenerateHotModuleTemplateOptions}.
 * @returns The template part.
 */
const generateHotModuleTemplate = ({
  packages,
  template,
}: GenerateHotModuleTemplateOptions): string => {
  template += `if (module["hot"]) {
  module["hot"].accept(
    [
      "@frontity/core/src/client",\n`;
  packages.forEach(({ path }) => {
    template += `      "${path}",\n`;
  });
  template += `    ],
    () => {
      const client = require("@frontity/core/src/client").default;\n`;
  packages.forEach(
    ({ name, mode, path }) =>
      (template += `      const ${getVariable(
        name,
        mode
      )} = require("${path}").default;\n`)
  );
  template += "      const packages = {\n";
  packages.forEach(
    ({ name, mode }) => (template += `        ${getVariable(name, mode)},\n`)
  );
  template +=
    "      };\n      client({ packages, isHmr: true });\n    }\n  );\n}";
  return template;
};

/**
 * Create an entry-point file for the server and return the bundle name and
 * path.
 *
 * @param options - Defined in {@link GenerateServerEntryPointOptions}.
 * @returns The name and path of the final server bundle.
 */
export const generateServerEntryPoint = async ({
  sites,
  outDir,
}: GenerateServerEntryPointOptions): Promise<EntryPoints> => {
  const packages = await getPackagesList({ sites, type: "server" });
  const template = generateImportsTemplate({ packages, type: "server" });
  // Write the file and return the bundle.
  const path = `${outDir}/bundling/entry-points/server.ts`;
  await writeFile(path, template, "utf8");
  return { name: "server", path };
};

/**
 * Create entry-point files for the client and return all the bundle names and
 * paths.
 *
 * @param options - Defined in {@link GenerateEntryPointsOptions}.
 * @returns The name and path of the final client bundles.
 */
export const generateClientEntryPoints = async ({
  sites,
  outDir,
  mode,
}: GenerateEntryPointsOptions): Promise<EntryPoints[]> => {
  return (
    await Promise.all(
      // Iterate over the sites
      sites.map(async (site) => {
        const packages = await getPackagesList({
          sites: [site],
          type: "client",
        });
        if (packages.length === 0) return;
        let template = generateImportsTemplate({
          packages,
          type: "client",
        });
        if (mode === "development") {
          template = generateHotModuleTemplate({ template, packages });
        }
        // Create sub-folder for site.
        await ensureDir(`${outDir}/bundling/entry-points/${site.name}`);
        // Write the file and return the bundle.
        const path = `${outDir}/bundling/entry-points/${site.name}/client.ts`;
        await writeFile(path, template, "utf8");
        return { name: site.name, path };
      })
      // Filter non-existent bundles.
    )
  ).filter((bundle) => bundle);
};

/**
 * Create entry-point files and return all the bundle names and paths.
 *
 * @param options - Defined in {@link GenerateEntryPointsOptions}.
 * @returns The name and path of the final bundles.
 */
const generateEntryPoints = async ({
  sites,
  outDir,
  mode,
}: GenerateEntryPointsOptions): Promise<EntryPoints[]> => {
  // Check if all the packages are installed.
  await checkForPackages({ sites });

  // Generate the bundles. One for the server.
  const serverEntryPoints = await generateServerEntryPoint({ sites, outDir });
  const clientEntryPoints = await generateClientEntryPoints({
    sites,
    outDir,
    mode,
  });

  return [...clientEntryPoints, serverEntryPoints];
};

export default generateEntryPoints;
