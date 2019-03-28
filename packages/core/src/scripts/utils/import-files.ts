import { writeFile } from "fs-extra";

const flat = (arr: string[][]): string[] => [].concat(...arr);

const variable = (pkg: string): string => {
  return pkg.replace(/(@|\/|-|\.)/g, "");
};

const serverTemplate = (packages: string[]): string => {
  const imports = packages.map(
    pkg => `import * as ${variable(pkg)} from "${pkg}"`
  );
  return imports.join("\n");
};

export const generateServerFile = async ({ packages }) => {
  const pkgs = flat(Object.values(packages));
  const template = serverTemplate(pkgs);
  console.log(template);
  await writeFile("build/bundling/server-imports.js", template, "utf8");
};
