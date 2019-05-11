import { createStore } from "@frontity/connect";
import { Package } from "@frontity/types";
import { mergePackages } from "../utils/packages";

export default ({
  packages,
  state
}: {
  packages: {
    [name: string]: Package;
  };
  state: {
    frontity: {
      mode: string;
      packages: string[];
    };
  };
}) => {
  const merged = mergePackages({ packages, state });
  const store = createStore(merged);
  return store;
};
