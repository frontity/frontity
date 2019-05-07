import { createStore } from "@frontity/connect";
import Package from "@frontity/types/package";
import { mergePackages } from "../utils/packages";
import { PackageList } from "../types";

export default ({
  packages,
  state
}: {
  packages: {
    [name: string]: Package;
  };
  state: {
    settings: {
      frontity: {
        packages: PackageList;
      };
    };
  };
}) => {
  const merged = mergePackages({ packages, state });
  const store = createStore(merged);
  return store;
};
