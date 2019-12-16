import HeadTagsPackage from "../types";
import Component from "./components";
import { getCurrentHeadTags } from "./utils";

const headTags = (): HeadTagsPackage => ({
  name: "@frontity/head-tags",
  roots: { headTags: Component },
  state: {
    headTags: {
      get: ({ state }) => link => getCurrentHeadTags({ state, link })
    }
  }
});

export default headTags;
