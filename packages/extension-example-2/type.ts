import { Package } from "@frontity/types";
import { Action } from "@frontity/types";

interface ExtensionExample2 extends Package {
  name: "@frontity/extension-example-2";
  state: {
    theme: {
      prop1: number;
    };
    comments: {
      prop2: number;
    };
  };
  actions: {
    theme: {
      beforeSSR?: Action<ExtensionExample2>;
    };
  };
  roots: {
    theme: React.ReactType;
  };
  fills: {
    theme: React.ReactType;
  };
  libraries: {
    comments: {
      Comment: React.ReactType;
    };
  };
}

export default ExtensionExample2;
