import { Settings } from "frontity/types";

const settings: Settings = [
  {
    name: "head",
    packages: ["head"]
  },
  {
    name: "image",
    packages: ["image"]
  },
  {
    name: "fonts",
    packages: [
      {
        name: "@frontity/tiny-router",
        state: { router: { autoFetch: false } }
      },
      "fonts"
    ]
  },
  {
    name: "global",
    packages: [
      {
        name: "@frontity/tiny-router",
        state: { router: { autoFetch: false } }
      },
      "global"
    ]
  }
];

export default settings;
