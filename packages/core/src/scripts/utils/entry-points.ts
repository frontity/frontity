import { writeFile, ensureDir } from "fs-extra";
import { flatten, uniqBy, uniq } from "lodash";

const variable = (pkg: string): string => {
  return pkg.replace(/(@|\/|-|\.)/g, "");
};

export const generateServerEntryPoint = async ({
  sites,
  outDir
}: {
  sites: {
    name: string;
    mode: string;
    packages: string[];
  }[];
  outDir: string;
}): Promise<void> => {
  const packagesWithMode = uniqBy(
    flatten(
      sites.map(site => site.packages.map(pkg => ({ mode: site.mode, pkg })))
    ),
    ({ mode, pkg }) => `${mode}${pkg}`
  );
  let template = "";
  packagesWithMode.forEach(
    ({ pkg, mode }) =>
      (template += `import * as ${variable(
        pkg
      )} from "${pkg}/src/${mode}/server";\n`)
  );
  template += "\nexport {\n";
  packagesWithMode.forEach(({ pkg }) => (template += `  ${variable(pkg)},\n`));
  template += "};";
  await writeFile(
    `${outDir}/bundling/entry-points/server.js`,
    template,
    "utf8"
  );
};

export const generateClientEntryPoints = async ({
  sites,
  outDir
}: {
  sites: {
    name: string;
    mode: string;
    packages: string[];
  }[];
  outDir: string;
}): Promise<void> => {
  await Promise.all(
    sites.map(({ name, mode, packages }) => {
      let template = "";
      const uniqPackages = uniq(packages);
      uniqPackages.map(
        pkg =>
          (template += `import * as ${variable(
            pkg
          )} from "${pkg}/src/${mode}/client";\n`)
      );
      template += "\nexport {\n";
      uniqPackages.forEach(pkg => (template += `  ${variable(pkg)},\n`));
      template += "};";
      return ensureDir(`${outDir}/bundling/entry-points/${name}`).then(() =>
        writeFile(
          `${outDir}/bundling/entry-points/${name}/client.js`,
          template,
          "utf8"
        )
      );
    })
  );
};
