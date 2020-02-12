import React from "react";
import Iframe from "@frontity/components/iframe";
import Package from "../types";
import { styled } from "frontity";

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
  name: "iframe",
  state: {},
  actions: {},
  libraries: {},
  roots: {
    iframe: Component
  }
};

export default IframePackage;
