import { Package } from "frontity/types";

interface Gutenberg extends Package {
  name: "@frontity/gutenberg";
  roots: {
    gutenberg: React.ReactType;
  };
  state: {
    gutenberg: {
      version: string;
      rtl: boolean;
    };
  };
}

export default Gutenberg;
