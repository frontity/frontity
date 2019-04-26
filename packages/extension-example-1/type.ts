import Package from "@frontity/types/package";

interface ExtensionExample1 extends Package {
  name: "@frontity/extension-example-1";
  settings: {
    extension1: {
      example1: string;
    };
  };
}

export default ExtensionExample1;
