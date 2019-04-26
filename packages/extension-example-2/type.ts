import Package from "@frontity/types/package";

interface ExtensionExample2 extends Package {
  name: "@frontity/extension-example-2";
  settings: {
    theme: {
      example2: string;
    };
  };
}

export default ExtensionExample2;
