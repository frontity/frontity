import YoastPackage from "../types";
import Component from "./components";

const yoastPackage: YoastPackage = {
  name: "@frontity/yoast",
  roots: { yoast: Component },
  state: {
    yoast: {
      onlyInSSR: false,
      transformLinks: {
        ignore: "^(wp-(json|admin|content|includes))|feed|comments|xmlrpc",
      },
    },
  },
};

export default yoastPackage;
