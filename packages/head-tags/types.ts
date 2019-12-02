import { Package } from "frontity/types";
import Source from "@frontity/source";
import Router from "@frontity/router";

export type HeadTags = {
  tag: "meta" | "link" | "title" | "style" | "script" | "noscript" | "base";
  attributes?: Record<string, string>;
  content?: string;
}[];

interface HeadTagsPackage extends Package {
  name: "@frontity/head-tags";
  roots: {
    headTags: React.FC;
  };
  state: {
    source?: Source["state"]["source"];
    router?: Router["state"]["router"];
  };
}

export default HeadTagsPackage;
