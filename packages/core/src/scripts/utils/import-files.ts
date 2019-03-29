import { writeFile } from "fs-extra";
import { flatten, uniq } from "lodash";

const variable = (pkg: string): string => {
  return pkg.replace(/(@|\/|-|\.)/g, "");
};

const generateFile = async ({
  filename,
  packages,
  outDir
}: {
  filename: string;
  packages: string[];
  outDir: string;
}): Promise<void> => {
  let template = "";
  packages.forEach(
    pkg => (template += `import * as ${variable(pkg)} from "${pkg}";\n`)
  );
  template += "\nexport {\n";
  packages.forEach(pkg => (template += `  ${variable(pkg)},\n`));
  template += "};";
  await writeFile(
    `${outDir}/bundling/imports/${filename}.js`,
    template,
    "utf8"
  );
};

export const generateServerFile = async ({
  packages,
  outDir
}: {
  packages: {
    [key: string]: string[];
  };
  outDir: string;
}): Promise<void> => {
  const pkgs = uniq(flatten(Object.values(packages)));
  await generateFile({ packages: pkgs, filename: "server", outDir });
};

export const generateClientFiles = async ({
  packages,
  outDir
}: {
  packages: {
    [key: string]: string[];
  };
  outDir: string;
}): Promise<void> => {
  Object.entries(packages).forEach(([site, pkgs]) => {
    const template = generateFile({
      packages: uniq(pkgs),
      filename: site,
      outDir
    });
  });
};
