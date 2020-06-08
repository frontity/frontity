import { Package, Derived } from "frontity/types";
import { InitializedStore } from "@frontity/connect";
import Router from "@frontity/router/types";
import Source, {
  TaxonomyEntity,
  PostEntity,
  AuthorEntity,
  PostType,
} from "@frontity/source/types";

/**
 * Create a new type by merging two types.
 * The second type overrides those attributes that are present in the first one.
 * @param M First type.
 * @param N Second type.
 * @return Merged types.
 */
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export type HeadTag = {
  tag: "meta" | "link" | "title" | "style" | "script" | "noscript" | "base";
  attributes?: Record<string, string>;
  content?: string;
};
export type HeadTags = HeadTag[];

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
    headTags: {
      get: Derived<HeadTagsPackage, string, HeadTags>;
      transformLinks:
        | {
            ignore: string;
            base?: string;
          }
        | false;
    };
    frontity?: {
      url: string;
    };
    source?: Merge<
      Source["state"]["source"],
      {
        isWpCom?: boolean;
        api: string;
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
