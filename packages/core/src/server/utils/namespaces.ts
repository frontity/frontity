import { NormalizedSettings } from "@frontity/file-settings";
import { getVariable } from "../../utils/packages";
import flatten from "lodash/flatten";

type Namespace = {
  Root?: React.Component;
  Fills?: React.Component;
};

export type Packages = {
  [key: string]: { [key: string]: Namespace };
};

export const getNamespaces = ({
  packages,
  settings
}: {
  packages: Packages;
  settings: NormalizedSettings;
}) => {
  const namespaces = flatten(
    settings.packages.map(pkg => {
      const pkgName = getVariable(pkg.name, settings.mode);
      const namespaces = Object.entries(packages[pkgName]);
      return !pkg.namespaces
        ? namespaces
        : namespaces.filter(ns => pkg.namespaces.includes(ns[0]));
    })
  ).reduce((namespaces, [namespace, module]) => {
    if (namespaces[namespace])
      throw new Error(
        `You have two packages that use the "${namespace}" namespace. Please remove one of them.`
      );
    namespaces[namespace] = module;
    return namespaces;
  }, {});
  return namespaces;
};
