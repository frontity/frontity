import React from "react";
import { Head } from "frontity";
import Package from "../types";

const Root: React.FC = () => (
  <>
    <Head>
      <title>The Title</title>
    </Head>
    <div>Body Content</div>
  </>
);

const HeadPackage: Package = {
  name: "head",
  state: {},
  actions: {},
  roots: {
    head: Root
  },
  libraries: {}
};

export default HeadPackage;
