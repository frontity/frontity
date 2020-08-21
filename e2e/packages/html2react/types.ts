import { Package, Action } from "frontity/types";
import Html2React from "@frontity/html2react/types";

interface Html2ReactTests extends Package {
  name: "e2e-html2react";
  state: {
    html2reactTests: {
      color: string;
      removeParagraphs: boolean;
    };
  };
  actions: {
    html2reactTests: {
      setColor: Action<Html2ReactTests, string>;
      removeParagraphs: Action<Html2ReactTests>;
    };
  };
  roots: {
    html2reactTests: React.ReactType;
  };
  libraries: {
    html2react: Partial<Html2React["libraries"]["html2react"]>;
  };
}

export default Html2ReactTests;
