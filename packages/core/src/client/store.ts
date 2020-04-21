import { createStore } from "@frontity/connect";
import { Package } from "@frontity/types";
import mergePackages from "../utils/merge-packages";

export default ({
  packages,
  state,
}: {
  packages: {
    [name: string]: Package;
  };
  state: Package["state"];
}) => {
  state.frontity.platform = "client";
  const merged = mergePackages({ packages, state, overwriteArrays: true });
  const store = createStore(merged);
  return store;
};
