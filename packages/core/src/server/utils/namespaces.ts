import { NormalizedSettings } from "@frontity/file-settings";
import { Namespace } from "@frontity/types/namespace";
import flatten from "lodash/flatten";
import { getVariable } from "../../utils/packages";

export type Packages = {
  [key: string]: { [key: string]: Namespace };
};

// Get the correct namespaces for the server, depending on the site loaded.
export const getNamespaces = ({
  packages,
  settings
}: {
  packages: Packages;
  settings: NormalizedSettings;
}) => {
  const namespaces = flatten(
    // Iterate over each package.
    settings.packages.map(pkg => {
      const pkgVariable = getVariable(pkg.name, settings.mode);
      const namespaces = Object.entries(packages[pkgVariable]);
      // If the dev has used "namepsaces", import only those.
      return pkg.namespaces.length > 0
        ? namespaces.filter(ns => pkg.namespaces.includes(ns[0]))
        : namespaces;
    })
  ).reduce((namespaces, [namespace, module]) => {
    if (namespaces[namespace])
      // Throw when there are any namespace conflict.
      throw new Error(
        `You have two packages that use the "${namespace}" namespace. Please remove one of them.`
      );
    namespaces[namespace] = module;
    return namespaces;
  }, {});
  return namespaces;
};
