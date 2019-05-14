import { Package, Action, Derived } from "@frontity/types";
import { Data } from "./src/data";
import { Taxonomy, PostType, Attachment, Author } from "./src/entities";

export type PathOrObj =
  | string
  | {
      path: string;
      page?: number;
    };

export type Data = Data;

interface Source<T = null> extends Package {
  state: {
    source: {
      data: Derived<T extends null ? Source : T, (pathOrLink: string) => Data>;
      dataMap: Record<string, Data>;
      category: Record<string, Taxonomy>;
      tag: Record<string, Taxonomy>;
      post: Record<string, PostType>;
      page: Record<string, PostType>;
      author: Record<string, Author>;
      attachment: Record<string, Attachment>;
    };
  };
  actions: {
    source: {
      fetch: Action<T extends null ? Source : T, PathOrObj>;
      init?: Action<Source>;
    };
  };
  libraries: {
    source: {
      populate: Function;
    };
  };
}

export default Source;
