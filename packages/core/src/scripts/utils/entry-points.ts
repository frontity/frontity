import { resolve } from "path";
import { writeFile, ensureDir, pathExists } from "fs-extra";
import { flatten, uniqBy, uniq } from "lodash";
import { EntryPoints } from "../../types";

type Sites = {
  name: string;
  mode: string;
  packages: string[];
}[];

const extensions = [".js", ".jsx", ".ts", ".tsx"];

// Remove some characters present in the npm package name to turn it into a variable name.
export const getVariable = (pkg: string, mode: string) => {
  return (
    pkg
      .replace(/^@/, "")
      .replace(/-/g, "_")
      .replace(/\//g, "__")
      .replace(/\./g, "___") + `_${mode}`
  );
};

// Check if the entry point exists using all the possible extensions.
const entryExists = async ({
  pkg,
  mode,
  type
}: {
  pkg: string;
  mode: string;
  type: string;
}) => {
  const allExist = await Promise.all(
    extensions.map(async extension => {
      return await pathExists(
        resolve(
          process.cwd(),
          "node_modules",
          `${pkg}/src/${mode}/${type}${extension}`
        )
      );
    })
  );
  return allExist.reduce((prev, curr) => prev || curr, false);
};

// Throw if any of the packages is not installed.
export const checkForPackages = async ({ sites }: { sites: Sites }) => {
  // Turn the list into an array of package names.
  const packages = uniq(flatten(sites.map(site => site.packages)));
  await Promise.all(
    // Iterate over the packages.
    packages.map(async pkg => {
      // Check if the folder exists.
      const exists = await pathExists(
        resolve(process.cwd(), "node_modules", pkg)
      );
      if (!exists)
        throw new Error(
          `The package "${pkg}" doesn't seem to be installed. Make sure you did "npm install ${pkg}"`
        );
    })
  );
};

// Turn a list of sites into a list of packages that can be used to create the templates.
const getPackagesList = async ({
  sites,
  type
}: {
  sites: Sites;
  type: "client" | "server";
}): Promise<
  {
    pkg: string;
    mode: string;
  }[]
> => {
  // Get a flat array of unique packages and its modes.
  const packages = uniqBy(
    flatten(
      sites.map(site => site.packages.map(pkg => ({ mode: site.mode, pkg })))
    ),
    ({ mode, pkg }) => `${mode}${pkg}`
  );
  return (await Promise.all(
    // Iterate over the packages.
    packages.map(async ({ pkg, mode }) => {
      // Check if the entry point of that mode exists.
      const exists = await entryExists({ pkg, mode, type });
      return { pkg, mode, exists };
    })
    // Remove the packages where the entry point doesn't exist.
  )).filter(({ exists }) => exists);
};

// Create an entry-point file for the server and return the bundle name and path.
export const generateServerEntryPoint = async ({
  sites,
  outDir
}: {
  sites: Sites;
  outDir: string;
}): Promise<EntryPoints> => {
  const packages = await getPackagesList({ sites, type: "server" });
  let template = "";
  // Create the "import" part of the file.
  packages.forEach(
    ({ pkg, mode }) =>
      (template += `import * as ${getVariable(
        pkg,
        mode
      )} from "${pkg}/src/${mode}/server";\n`)
  );
  // Create the "export" part of the file.
  template += "\nexport {\n";
  packages.forEach(
    ({ pkg, mode }) => (template += `  ${getVariable(pkg, mode)},\n`)
  );
  template += "};";
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
  sites: Sites;
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
        let template = "";
        // Create the "import" part of the file.
        packages.forEach(
          ({ pkg, mode }) =>
            (template += `import * as ${getVariable(
              pkg,
              mode
            )} from "${pkg}/src/${site.mode}/client";\n`)
        );
        // Create the "export" part of the file.
        template += "\nexport {\n";
        packages.forEach(
          ({ pkg, mode }) => (template += `  ${getVariable(pkg, mode)},\n`)
        );
        template += "};";
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
