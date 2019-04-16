import { resolve } from "path";
import { writeFile, ensureDir, pathExists } from "fs-extra";
import { flatten, uniqBy, uniq } from "lodash";
import { Site } from "@frontity/file-settings";
import { EntryPoints } from "../../types";
import { getVariable } from "../../utils/packages";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

// Check if the entry point exists using all the possible extensions.
const entryExists = async ({
  name,
  mode,
  type
}: {
  name: string;
  mode: string;
  type: string;
}) => {
  const allExist = await Promise.all(
    extensions.map(async extension => {
      return await pathExists(
        resolve(
          process.cwd(),
          "node_modules",
          `${name}/src/${mode}/${type}${extension}`
        )
      );
    })
  );
  return allExist.reduce((prev, curr) => prev || curr, false);
};

// Throw if any of the packages is not installed.
export const checkForPackages = async ({ sites }: { sites: Site[] }) => {
  // Turn the list into an array of package names.
  const packages = uniq(flatten(sites.map(site => site.packages)));
  await Promise.all(
    // Iterate over the packages.
    packages.map(async pkg => {
      // Check if the folder exists.
      const exists = await pathExists(
        resolve(process.cwd(), "node_modules", pkg.name)
      );
      if (!exists)
        throw new Error(
          `The package "${
            pkg.name
          }" doesn't seem to be installed. Make sure you did "npm install ${
            pkg.name
          }"`
        );
    })
  );
};

// Turn a list of sites into a list of packages that can be used to create the templates.
const getPackagesList = async ({
  sites,
  type
}: {
  sites: Site[];
  type: "client" | "server";
}): Promise<
  {
    name: string;
    mode: string;
  }[]
> => {
  // Get a flat array of unique packages and its modes.
  const packages = uniqBy(
    flatten(
      sites.map(site => site.packages.map(pkg => ({ mode: site.mode, pkg })))
    ),
    ({ mode, pkg: { name } }) => `${mode}${name}`
  );
  return (await Promise.all(
    // Iterate over the packages.
    packages.map(async ({ pkg: { name }, mode }) => {
      // Check if the entry point of that mode exists.
      const exists = await entryExists({ name, mode, type });
      return { name, mode, exists };
    })
    // Remove the packages where the entry point doesn't exist.
  )).filter(({ exists }) => exists);
};

// Create an entry-point file for the server and return the bundle name and path.
export const generateServerEntryPoint = async ({
  sites,
  outDir
}: {
  sites: Site[];
  outDir: string;
}): Promise<EntryPoints> => {
  const packages = await getPackagesList({ sites, type: "server" });
  let template = 'import server from "@frontity/core/src/server";\n';
  // Create the "import" part of the file.
  packages.forEach(
    ({ name, mode }) =>
      (template += `import * as ${getVariable(
        name,
        mode
      )} from "${name}/src/${mode}/server";\n`)
  );
  // Create the "const packages = {...}" part of the file.
  template += "\nconst packages = {\n";
  packages.forEach(
    ({ name, mode }) => (template += `  ${getVariable(name, mode)},\n`)
  );
  template += "};\n\n";
  template += "export default server({ packages });";
  // Write the file and return the bundle.
  const path = `${outDir}/bundling/entry-points/server.ts`;
  await writeFile(path, template, "utf8");
  return { name: "server", path };
};

// Create entry-point files for the client and return all the bundle names and pathes.
export const generateClientEntryPoints = async ({
  sites,
  outDir
}: {
  sites: Site[];
  outDir: string;
}): Promise<EntryPoints[]> => {
  return (await Promise.all(
    // Iterate over the sites
    sites.map(async site => {
      // Get list of packages with mode for this site.
      const packages = await getPackagesList({
        sites: [{ name: site.name, mode: site.mode, packages: site.packages }],
        type: "client"
      });
      // Don't generate entry-points if there are no packages.
      if (packages.length > 0) {
        let template = 'import client from "@frontity/core/src/client";\n';
        // Create the "import" part of the file.
        packages.forEach(
          ({ name, mode }) =>
            (template += `import * as ${getVariable(
              name,
              mode
            )} from "${name}/src/${site.mode}/client";\n`)
        );
        // Create the "export" part of the file.
        template += "\nconst packages = {\n";
        packages.forEach(
          ({ name, mode }) => (template += `  ${getVariable(name, mode)},\n`)
        );
        template += "};\n\n";
        template += "export default client({ packages });";
        // Create sub-folder for site.
        await ensureDir(`${outDir}/bundling/entry-points/${site.name}`);
        // Write the file and return the bundle.
        const path = `${outDir}/bundling/entry-points/${site.name}/client.ts`;
        await writeFile(path, template, "utf8");
        return { name: site.name, path };
      }
    })
    // Filter non-existent bundles.
  )).filter(bundle => bundle);
};

export default async ({ sites, outDir }) => {
  // Check if all the packages are installed.
  await checkForPackages({ sites });

  // Generate the bundles. One for the server.
  const serverEntryPoints = await generateServerEntryPoint({ sites, outDir });
  const clientEntryPoints = await generateClientEntryPoints({ sites, outDir });

  return [...clientEntryPoints, serverEntryPoints];
};
