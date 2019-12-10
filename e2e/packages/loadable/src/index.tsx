import React from "react";
import Package from "../types";
import { loadable } from "frontity";
import Dynamic2 from "./dynamic-2";

const Dynamic1 = loadable(() => import("./dynamic"));

const Root: React.FC = () => (
  <>
    <Dynamic1 />
    <Dynamic2 />
  </>
);

const LoadablePackage: Package = {
  name: "loadable",
  state: {},
  actions: {},
  roots: {
    loadable: Root
  },
  libraries: {}
};

export default LoadablePackage;
