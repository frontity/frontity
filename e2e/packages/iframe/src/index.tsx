import React from "react";
import Iframe from "@frontity/components/iframe";
import Package from "../types";
import { styled } from "frontity";

/**
 * A React component that renders an Iframe.
 *
 * @returns An `<iframe>` tag of https://frontity.org.
 */
const Component: React.FC = () => (
  <Container>
    <Iframe
      src="https://frontity.org"
      width={500}
      height={500}
      loading="lazy"
      title="Frontity Website"
    />
  </Container>
);

const Container = styled.div`
  margin-top: 1200vh;
  margin-left: 1200vw;
`;

const IframePackage: Package = {
  roots: {
    iframe: Component,
  },
};

export default IframePackage;
