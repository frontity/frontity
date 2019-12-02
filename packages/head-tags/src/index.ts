import HeadTagsPackage from "../types";
import Component from "./components";

const headTags = (): HeadTagsPackage => ({
  name: "@frontity/head-tags",
  roots: { headTags: Component },
  state: {}
});

export default headTags;
