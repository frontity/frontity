import { createStore } from "@frontity/connect";
import { MergedPackages } from "../types";
import { NormalizedSettings } from "@frontity/file-settings";
import deepmerge from "deepmerge";

export default ({ merged }: { merged: MergedPackages }) => {
  const store = createStore(merged);
  return store;
};
