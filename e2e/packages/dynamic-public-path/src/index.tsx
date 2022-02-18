import Package from "../types";
import { loadable } from "frontity";

const Dynamic = loadable(() => import("./dynamic"));

/**
 * A React component that renders a dynamic component.
 *
 * @returns React element.
 */
const Root: React.FC = () => (
  <>
    <Dynamic />
  </>
);

const DynamicPublicPathPackage: Package = {
  name: "e2e-dynamic-public-path",
  roots: {
    dynamicPublicPath: Root,
  },
};

export default DynamicPublicPathPackage;
