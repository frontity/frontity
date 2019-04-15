import { NormalizedSettings } from "@frontity/file-settings";
import { getVariable } from "../../utils/packages";
import flatten from "lodash-es/flatten";

type Namespace = {
  Root?: React.Component;
  Fills?: React.Component;
};

type Packages = {
  [key: string]: Namespace;
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
      return Object.entries(packages[pkgName]);
    })
  ).reduce((namespaces, [namespace, module]) => {
    if (namespaces[namespace])
      throw new Error(
        `You have two packages for the "${namespace}" namespace. Please remove one of them.`
      );
    namespaces[namespace] = module;
    return namespaces;
  }, {});
  debugger;
};
