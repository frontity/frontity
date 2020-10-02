import React from "react";
import { connect, Slot } from "frontity";
import SmartAdserver, { Packages } from "../types";
import { Connect } from "frontity/types";

const Theme: React.FC<Connect<Packages>> = connect(({ libraries, state }) => {
  return (
    <>
      <Slot name="header" />
    </>
  );
});

const smartAdserver: SmartAdserver = {
  name: "e2e-smart-adserver",
  state: {
    source: {
      data: {},
      get: ({ state }) => (link) => state.source.data[link],
    },
    router: {
      link: "/",
    },
  },
  roots: {
    theme: Theme,
  },
};

export default smartAdserver;
