import HeadTagsPackage from "../types";
import Component from "./components";
import { getCurrentHeadTags } from "./utils";

const headTags = (): HeadTagsPackage => ({
  name: "@frontity/head-tags",
  roots: { headTags: Component },
  state: {
    headTags: {
      current: ({ state }) => getCurrentHeadTags({ state })
    }
  }
});

export default headTags;
