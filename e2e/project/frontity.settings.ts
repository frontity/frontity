import { Settings } from "frontity/types";

const settings: Settings = [
  {
    name: "head",
    packages: ["e2e-head"]
  },
  {
    name: "image",
    packages: ["e2e-image"]
  },
  {
    name: "fonts",
    packages: [
      {
        name: "@frontity/tiny-router",
        state: { router: { autoFetch: false } }
      },
      "e2e-fonts"
    ]
  },
  {
    name: "emotion",
    packages: [
      {
        name: "@frontity/tiny-router",
        state: { router: { autoFetch: false } }
      },
      "e2e-emotion"
    ]
  },
  {
    name: "loadable",
    packages: ["e2e-loadable"]
  },
  {
    name: "iframe",
    packages: ["e2e-iframe"]
  },
  {
    name: "wp-source-errors",
    packages: ["e2e-wp-source-errors", "@frontity/wp-source"]
  },
  {
    name: "script",
    packages: ["e2e-script"]
  }
];

export default settings;
