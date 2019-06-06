import { Package } from "frontity/types";
import { Parse, Processor, Component } from "./types";

interface Html2React extends Package {
  name: "@frontity/html2react";
  libraries: {
    html2react: {
      parse: Parse;
      processors: Processor[];
      Component: Component;
    };
  };
}

export default Html2React;
