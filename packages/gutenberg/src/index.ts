import GutenbergPackage from "../types";
import Gutenberg from "./components";

const gutenberg: GutenbergPackage = {
  name: "@frontity/gutenberg",
  roots: {
    gutenberg: Gutenberg
  },
  state: {
    gutenberg: {
      version: "wp-5.0",
      direction: "ltr",
      theme: true
    }
  }
};

export default gutenberg;
