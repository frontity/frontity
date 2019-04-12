import { Settings, Package } from "@frontity/file-settings";

interface ExtensionExample1 extends Package {
  name: "@frontity/extension-example-1";
  settings: {
    example1: string;
  };
}

interface ExtensionExample2 extends Package {
  name: "@frontity/extension-example-2";
  settings: {
    example2: string;
  };
}

const settings: Settings<ExtensionExample1 | ExtensionExample2> = [
  {
    name: "site-1",
    settings: {
      url: "https://test.frontity.io"
    },
    packages: [
      {
        name: "@frontity/extension-example-1",
        settings: {
          example1: ""
        }
      },
      {
        name: "@frontity/extension-example-2",
        settings: {
          example2: ""
        }
      }
    ]
  },
  {
    name: "site-2",
    settings: {
      url: "https://test.frontity.io"
    },
    packages: [
      {
        name: "@frontity/extension-example-2",
        settings: {
          example2: ""
        }
      }
    ]
  },
  {
    name: "site-3",
    mode: "amp",
    settings: {
      url: "https://test.frontity.io"
    },
    packages: [
      {
        name: "@frontity/extension-example-2",
        settings: {
          example2: ""
        }
      }
    ]
  }
];

module.exports = settings;
