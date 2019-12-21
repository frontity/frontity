import { Package } from "frontity/types";

interface Gutenberg extends Package {
  name: "@frontity/gutenberg";
  roots: {
    gutenberg: React.ReactType;
  };
  state: {
    gutenberg: {
      version: string;
      direction: string;
      theme: boolean;
    };
  };
}

export default Gutenberg;
