import { resolve } from "path";
import { writeFile, ensureDir, pathExists } from "fs-extra";
import { flatten, uniqBy, uniq } from "lodash";
import { Site } from "@frontity/file-settings";
import { EntryPoints, Mode } from "../../types";
import getVariable from "../../utils/get-variable";
import entryExists from "./entry-exists";

type Package = {
  name: string;
  mode: string;
  path: string;
};

type Type = "client" | "server" | "inline";

export const entryPoint = async ({
  name,
  mode,
  type
}: {
  name: string;
  mode: string;
  type: Type;
}): Promise<string> => {
  if (mode !== "default") {
    // Check first inside the mode and in the type.
    if (await entryExists(`${name}/${mode}/${type}`))
      return `${name}/${mode}/${type}`;
    // If it's client or server, check on index as well.
    if (
      (type === "client" || type === "server") &&
      (await entryExists(`${name}/${mode}`))
    ) {
      return `${name}/${mode}`;
    }
  }
  // Check now outside of the mode for the specific type.
  if (await entryExists(`${name}/${type}`)) return `${name}/${type}`;
  // And finally, if it's client or server, check on index as well.
  if (
    (type === "client" || type === "server") &&
    (await entryExists(`${name}`))
  ) {
    return `${name}`;
  }
  // Don't return path if no entry point is found.
  return "";
};

// Throw if any of the packages is not installed.
export const checkForPackages = async ({ sites }: { sites: Site[] }) => {
  // Turn the list into an array of package names.
  const packages = uniq(flatten(sites.map(site => site.packages)));
  await Promise.all(
    // Iterate over the packages.
    packages.map(async name => {
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

// Turn a list of sites into a list of packages that can be used to create the templates.
const getPackagesList = async ({
  sites,
  type
}: {
  sites: Site[];
  type: Type;
}): Promise<Package[]> => {
  // Get a flat array of unique packages and its modes.
  const packages = uniqBy(
    flatten(
      sites.map(site => site.packages.map(name => ({ mode: site.mode, name })))
    ),
    ({ mode, name }) => `${mode}${name}`
  );
  return (await Promise.all(
    // Iterate over the packages.
    packages.map(async ({ name, mode }) => {
      // Check if the entry point of that mode exists.
      const path = await entryPoint({ name, mode, type });
      return { name, mode, path };
    })
    // Remove the packages where the entry point doesn't exist.
  )).filter(({ path }) => path !== "");
};

const generateImportsTemplate = ({
  packages,
  type
}: {
  packages: Package[];
  type: Type;
}): string => {
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

const generateHotModuleTemplate = ({
  packages,
  template
}: {
  packages: Package[];
  template: string;
}): string => {
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
  template += "      };\n      client({ packages });\n    }\n  );\n}";
  return template;
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
  const template = generateImportsTemplate({ packages, type: "server" });
  // Write the file and return the bundle.
  const path = `${outDir}/bundling/entry-points/server.ts`;
  await writeFile(path, template, "utf8");
  return { name: "server", path };
};

// Create entry-point files for the client and return all the bundle names and pathes.
export const generateClientEntryPoints = async ({
  sites,
  outDir,
  mode
}: {
  sites: Site[];
  outDir: string;
  mode: Mode;
}): Promise<EntryPoints[]> => {
  return (await Promise.all(
    // Iterate over the sites
    sites.map(async site => {
      const packages = await getPackagesList({ sites: [site], type: "client" });
      if (packages.length === 0) return;
      let template = generateImportsTemplate({
        packages,
        type: "client"
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
  )).filter(bundle => bundle);
};

export default async ({
  sites,
  outDir,
  mode
}: {
  sites: Site[];
  outDir: string;
  mode: Mode;
}) => {
  // Check if all the packages are installed.
  await checkForPackages({ sites });

  // Generate the bundles. One for the server.
  const serverEntryPoints = await generateServerEntryPoint({ sites, outDir });
  const clientEntryPoints = await generateClientEntryPoints({
    sites,
    outDir,
    mode
  });

  return [...clientEntryPoints, serverEntryPoints];
};
