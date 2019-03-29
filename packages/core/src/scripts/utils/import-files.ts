import { writeFile } from "fs-extra";
import { flatten, uniq } from "lodash";

const variable = (pkg: string): string => {
  return pkg.replace(/(@|\/|-|\.)/g, "");
};

const generateFile = async ({
  filename,
  packages
}: {
  filename: string;
  packages: string[];
}): Promise<void> => {
  let template = "";
  packages.forEach(
    pkg => (template += `import * as ${variable(pkg)} from "${pkg}";\n`)
  );
  template += "\nexport {\n";
  packages.forEach(pkg => (template += `  ${variable(pkg)},\n`));
  template += "};";
  await writeFile(`build/bundling/${filename}.js`, template, "utf8");
};

export const generateServerFile = async ({
  packages
}: {
  packages: {
    [key: string]: string[];
  };
}): Promise<void> => {
  const pkgs = uniq(flatten(Object.values(packages)));
  await generateFile({ packages: pkgs, filename: "server" });
};
