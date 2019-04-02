import { resolve } from "path";
import { writeFile, ensureDir, pathExists } from "fs-extra";
import { flatten, uniqBy, uniq } from "lodash";

type Sites = {
  name: string;
  mode: string;
  packages: string[];
}[];

const variable = (pkg: string): string => {
  return pkg.replace(/(@|\/|-|\.)/g, "");
};

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
  const packagesWithMode = uniqBy(
    flatten(
      sites.map(site => site.packages.map(pkg => ({ mode: site.mode, pkg })))
    ),
    ({ mode, pkg }) => `${mode}${pkg}`
  );
  return (await Promise.all(
    packagesWithMode.map(async ({ pkg, mode }) => {
      const exists = await pathExists(
        resolve(process.cwd(), "node_modules", `${pkg}/src/${mode}/${type}`)
      );
      return { pkg, mode, exists };
    })
  )).filter(({ exists }) => exists);
};

export const generateServerEntryPoint = async ({
  sites,
  outDir
}: {
  sites: Sites;
  outDir: string;
}): Promise<void> => {
  const packagesWithMode = await getPackagesList({ sites, type: "server" });
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
  sites: Sites;
  outDir: string;
}): Promise<void> => {
  await Promise.all(
    sites.map(async ({ name, mode, packages }) => {
      const packagesWithMode = await getPackagesList({
        sites: [{ name, mode, packages }],
        type: "client"
      });
      if (packagesWithMode.length > 0) {
        let template = "";
        packagesWithMode.forEach(
          ({ pkg }) =>
            (template += `import * as ${variable(
              pkg
            )} from "${pkg}/src/${mode}/client";\n`)
        );
        template += "\nexport {\n";
        packagesWithMode.forEach(
          ({ pkg }) => (template += `  ${variable(pkg)},\n`)
        );
        template += "};";
        await ensureDir(`${outDir}/bundling/entry-points/${name}`);
        return writeFile(
          `${outDir}/bundling/entry-points/${name}/client.js`,
          template,
          "utf8"
        );
      }
    })
  );
};
