import HeadTagsPackage from "../types";
import Component from "./components";
import { getHeadTags } from "./utils";

const headTags: HeadTagsPackage = {
  name: "@frontity/head-tags",
  roots: { headTags: Component },
  state: {
    headTags: {
      get: ({ state }) => (link) => getHeadTags({ state, link }),
      transformLinks: {
        ignore: "^(wp-(json|admin|content|includes))|feed|comments|xmlrpc",
      },
    },
  },
};

export default headTags;
