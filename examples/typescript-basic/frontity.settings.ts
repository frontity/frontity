import Settings from "@frontity/types/settings";
import ExtensionExample1 from "@frontity/extension-example-1/type";
import ExtensionExample2 from "@frontity/extension-example-2/type";

const settings: Settings<ExtensionExample1 | ExtensionExample2> = [
  {
    name: "site-1",
    settings: {
      url: "https://test.frontity.io"
    },
    packages: [
      {
        name: "@frontity/extension-example-1",
        excludedNamespaces: ["extension1"],
        settings: {
          extension1: {
            setting1: "1"
          }
        }
      },
      {
        name: "@frontity/extension-example-2",
        settings: {
          theme: {
            setting1: "1"
          }
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
          theme: {
            setting1: "1"
          }
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
          theme: {
            setting1: "1"
          }
        }
      }
    ]
  }
];

module.exports = settings;
