import Package from "@frontity/types/package";
import Action from "@frontity/types/action";
import Namespaces from "@frontity/types/namespaces";

interface ExtensionExample2 extends Package {
  name: "@frontity/extension-example-2";
  namespaces: Namespaces<"theme" | "comments">;
  state: {
    settings: {
      theme: {
        setting1: string;
      };
    };
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
