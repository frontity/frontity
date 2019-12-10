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
import { Merge } from "@frontity/source/src/utils";

export type HeadTags = {
  tag: "meta" | "link" | "title" | "style" | "script" | "noscript" | "base";
  attributes?: Record<string, string>;
  content?: string;
}[];

export type WithHeadTags = {
  head_tags?: HeadTags;
};

export type PostEntityWithHeadTags = Merge<PostEntity, WithHeadTags>;
export type PostTypeWithHeadTags = Merge<PostType, WithHeadTags>;
export type AuthorEntityWithHeadTags = Merge<AuthorEntity, WithHeadTags>;
export type TaxonomyWithHeadTags = Merge<TaxonomyEntity, WithHeadTags>;

interface HeadTagsPackage extends Package {
  name: "@frontity/head-tags";
  roots: {
    headTags: React.FC;
  };
  state: {
    frontity?: {
      url: string;
    };
    source?: Merge<
      WpSource["state"]["source"],
      {
        post: Record<string, PostEntityWithHeadTags>;
        page: Record<string, PostEntityWithHeadTags>;
        author: Record<string, AuthorEntityWithHeadTags>;
        type: Record<string, PostTypeWithHeadTags>;
        category: Record<string, TaxonomyWithHeadTags>;
        tag: Record<string, TaxonomyWithHeadTags>;
      }
    >;
    router?: Router["state"]["router"];
  };
}

export type State = InitializedStore<HeadTagsPackage>["state"];

export default HeadTagsPackage;
