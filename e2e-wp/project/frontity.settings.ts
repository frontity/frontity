import { Settings } from "frontity/types";

const settings: Settings = [
  {
    name: "e2e-wp-test",
    packages: [
      "e2e-wp-test",
      "@frontity/tiny-router",
      {
        name: "@frontity/wp-source",
        state: { source: { api: "http://localhost:8080/wp-json" } },
      },
    ],
  },
];

export default settings;
