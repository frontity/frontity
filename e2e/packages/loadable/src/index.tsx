import * as React from "react";
import Package from "../types";
import { loadable } from "frontity";
import Dynamic2 from "./dynamic-2";

const Dynamic1 = loadable(() => import("./dynamic"));

/**
 * A React component that renders two dynamic components.
 *
 * @returns React element.
 */
const Root: React.FC = () => (
  <>
    <Dynamic1 />
    <Dynamic2 />
  </>
);

const LoadablePackage: Package = {
  name: "e2e-loadable",
  roots: {
    loadable: Root,
  },
};

export default LoadablePackage;
