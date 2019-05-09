import Settings from "@frontity/types/settings";
import ExtensionExample1 from "@frontity/extension-example-1/type";
import ExtensionExample2 from "@frontity/extension-example-2/type";

const settings: Settings<ExtensionExample1 | ExtensionExample2> = [
  {
    name: "site-1",
    state: {
      frontity: {
        url: "https://test.frontity.io"
      }
    },
    packages: [
      {
        name: "@frontity/extension-example-1",
        state: {
          comments: {
            prop2: 2
          }
        }
      },
      {
        name: "@frontity/extension-example-2",
        state: {
          theme: {
            prop1: 1
          }
        }
      }
    ]
  },
  {
    name: "site-2",
    state: {
      frontity: {
        url: "https://test.frontity.io"
      }
    },
    packages: [
      {
        name: "@frontity/extension-example-2",
        state: {
          theme: {
            prop1: 1
          }
        }
      }
    ]
  },
  {
    name: "site-3",
    mode: "amp",
    state: {
      frontity: {
        url: "https://test.frontity.io"
      }
    },
    packages: [
      {
        name: "@frontity/extension-example-2",
        state: {
          theme: {
            prop1: 1
          }
        }
      }
    ]
  }
];

module.exports = settings;
