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
    name: "emotion",
    packages: [
      {
        name: "@frontity/tiny-router",
        state: { router: { autoFetch: false } }
      },
      "emotion"
    ]
  }
];

export default settings;
