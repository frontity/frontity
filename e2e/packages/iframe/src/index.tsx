import React from "react";
import Iframe from "@frontity/components/iframe";
import Package from "../types";

const Component: React.FC = () => {
  return (
    <Iframe
      id="lazy-loaded"
      src="https://frontity.org"
      width="200"
      height="500"
      title="Frontity Website"
    />
  );
};

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
