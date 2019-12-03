import { Package } from "frontity/types";
import { InitializedStore } from "@frontity/connect";
import Router from "@frontity/router";
import Source, { Taxonomy, PostType, Author, Type } from "@frontity/source";

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

export type State = InitializedStore<HeadTagsPackage>["state"];
export type Entity = (Taxonomy | Author | PostType | Type) & {
  head_tags?: HeadTags;
};

export default HeadTagsPackage;
