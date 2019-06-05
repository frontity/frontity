import { Package, Action, Derived } from "@frontity/types";
import { Data } from "./src/data";
import { Taxonomy, PostType, Attachment, Author } from "./src/entities";

export type RouteParams = {
  path: string;
  page?: number;
  query?: Record<string, any>;
  hash?: string;
};

export type Data = Data;

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
    };
  };
  actions: {
    source: {
      fetch: Action<T extends null ? Source : T, string>;
      init?: Action<T extends null ? Source : T>;
    };
  };
  libraries: {
    source: {
      populate: Function;
      parse: (routeOrParams: string | RouteParams) => RouteParams;
      stringify: (routeOrParams: string | RouteParams) => string;
    };
  };
}

export default Source;
