import Package from "../types";
import image from "./image.png";
import { loadable, styled } from "frontity";

const Dynamic = loadable(() => import("./dynamic"));

/**
 * A React component that renders a dynamic component.
 *
 * @returns React element.
 */
const Root: React.FC = () => (
  <>
    <img alt="test" data-test-id="image-1" src={image} />
    <Div />
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

const Div = styled.div`
  background-image: url(${image});
`;
