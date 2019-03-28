import { ImportedSettings, Package } from "@frontity/file-settings";

interface ExtensionExample extends Package {
  name: "@frontity/extension-example";
  settings: {
    thing: string;
  };
}

const settings: ImportedSettings<ExtensionExample> = {
  settings: {
    url: "https://test.frontity.io"
  },
  packages: [
    {
      name: "@frontity/extension-example",
      settings: {
        thing: ""
      }
    }
  ]
};

module.exports = settings;
