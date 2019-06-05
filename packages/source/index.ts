import { Package, Action, Derived } from "@frontity/types";
import { Data } from "./src/data";
import { Taxonomy, PostType, Attachment, Author } from "./src/entities";

export type RouteParams = {
  path: string;
  page?: number;
  query?: Record<string, any>;
};

export type Data = Data;

interface Source<T = null> extends Package {
  state: {
    source: {
      get: Derived<T extends null ? Source : T, (pathOrLink: string) => Data>;
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
      fetch: Action<T extends null ? Source : T, string | RouteParams>;
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
