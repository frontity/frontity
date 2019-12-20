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
      rtl: false
    }
  }
};

export default gutenberg;
