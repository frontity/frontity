import { Package, Action, Derived } from "frontity/types";
import { Data } from "./src/data";
import { Taxonomy, PostType, Attachment, Author, Type } from "./src/entities";

export type RouteParams = {
  path: string;
  page?: number;
  query?: Record<string, any>;
  hash?: string;
};

export type Data = Data;

export type Taxonomy = Taxonomy;
export type PostType = PostType;
export type Attachment = Attachment;
export type Author = Author;
export type Type = Type;

interface Source<T = null> extends Package {
  state: {
    source: {
      get: Derived<T extends null ? Source : T, (link: string) => Data>;
      data: Record<string, Data>;
      category: Record<string, Taxonomy>;
      tag: Record<string, Taxonomy>;
      post: Record<string, PostType>;
      page: Record<string, PostType>;
      author: Record<string, Author>;
      attachment: Record<string, Attachment>;
      type: Record<string, Type>;
    };
  };
  actions: {
    source: {
      fetch: Action<T extends null ? Source : T, string>;
    };
  };
  libraries: {
    source: {
      populate: Function;
      parse: (route: string) => RouteParams;
      stringify: (routeParams: RouteParams) => string;
      normalize: (route: string) => string;
    };
  };
}

export default Source;
