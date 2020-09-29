import React from "react";
import { connect, Slot } from "frontity";
import SmartAdserver, { Packages } from "../types";
import { Connect } from "frontity/types";

const Root: React.FC<Connect<Packages>> = connect(({ libraries }) => {
  const { SmartAd } = libraries.fills.smartAdserver;

  return (
    <>
      <Slot name="header" />
      <SmartAd />
    </>
  );
});

const smartAdserver: SmartAdserver = {
  name: "e2e-smart-adserver",
  state: {},
  roots: {
    smartAdserver: Root,
  },
};

export default smartAdserver;
