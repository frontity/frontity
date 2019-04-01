import { writeFile } from "fs-extra";
import { flatten, uniq } from "lodash";

const variable = (pkg: string): string => {
  return pkg.replace(/(@|\/|-|\.)/g, "");
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
      packages.map(
        pkg =>
          (template += `import * as ${variable(
            pkg
          )} from "${pkg}/src/${mode}/client";\n`)
      );
      template += "\nexport {\n";
      packages.forEach(pkg => (template += `  ${variable(pkg)},\n`));
      template += "};";
      return writeFile(
        `${outDir}/bundling/entry-points/${name}-${mode}.js`,
        template,
        "utf8"
      );
    })
  );
};
