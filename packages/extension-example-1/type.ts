import { Package, Namespaces, Derived } from "@frontity/types";

interface ExtensionExample1 extends Package {
  name: "@frontity/extension-example-1";
  namespaces: Namespaces<"extension1" | "comments">;
  state: {
    settings: {
      extension1: {
        setting1: string;
      };
    };
    extension1: {
      prop1: number;
    };
    comments: {
      prop2: number;
      prop3: Derived<ExtensionExample1, number>;
    };
  };
  roots: {
    extension1: React.ReactType;
  };
  fills: {
    extension1: React.ReactType;
  };
  libraries: {
    comments: {
      Comment: React.ReactType;
    };
  };
}

export default ExtensionExample1;
