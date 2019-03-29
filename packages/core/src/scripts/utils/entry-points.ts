import { writeFile } from "fs-extra";
import { flatten, uniq } from "lodash";

const variable = (pkg: string): string => {
  return pkg.replace(/(@|\/|-|\.)/g, "");
};

const generateFile = async ({
  filename,
  packages,
  outDir,
  mode,
  type
}: {
  filename: string;
  packages: string[];
  outDir: string;
  mode: string;
  type: "client" | "server" | "inline";
}): Promise<void> => {
  let template = "";
  packages.forEach(
    pkg =>
      (template += `import * as ${variable(
        pkg
      )} from "${pkg}/src/${mode}/${type}";\n`)
  );
  template += "\nexport {\n";
  packages.forEach(pkg => (template += `  ${variable(pkg)},\n`));
  template += "};";
  await writeFile(
    `${outDir}/bundling/entry-points/${filename}.js`,
    template,
    "utf8"
  );
};

export const generateServerEntryPoint = async ({
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

export const generateClientEntryPoints = async ({
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
