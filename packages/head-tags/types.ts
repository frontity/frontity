import { Package } from "frontity/types";
import { InitializedStore } from "@frontity/connect";
import Router from "@frontity/router";
import WpSource from "@frontity/wp-source/types";
import {
  TaxonomyEntity,
  PostEntity,
  AuthorEntity,
  PostType
} from "@frontity/source";

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
    frontity?: {
      url: string;
    };
    source?: WpSource["state"]["source"];
    router?: Router["state"]["router"];
  };
}

export type State = InitializedStore<HeadTagsPackage>["state"];
export type Entity = (TaxonomyEntity | AuthorEntity | PostEntity | PostType) & {
  head_tags?: HeadTags;
};

export default HeadTagsPackage;
