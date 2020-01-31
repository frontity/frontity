import { Package, Action, Derived } from "frontity/types";
import { Data } from "./src/data";
import {
  TaxonomyEntity,
  PostEntity,
  AttachmentEntity,
  AuthorEntity,
  TaxonomyType,
  PostType
} from "./src/entities";

// Export directly some types.
export { Data } from "./src/data";
export {
  TaxonomyEntity,
  PostEntity,
  AttachmentEntity,
  AuthorEntity,
  TaxonomyType,
  PostType
} from "./src/entities";
export { ServerError } from "./src/errors";

export type RouteParams = {
  path: string;
  page?: number;
  query?: Record<string, any>;
  hash?: string;
};

interface Source<T = null> extends Package {
  state: {
    source: {
      get: Derived<T extends null ? Source : T, (link: string) => Data>;
      data: Record<string, Data>;
      category: Record<string, TaxonomyEntity>;
      tag: Record<string, TaxonomyEntity>;
      post: Record<string, PostEntity>;
      page: Record<string, PostEntity>;
      author: Record<string, AuthorEntity>;
      attachment: Record<string, AttachmentEntity>;
      type: Record<string, PostType>;
      taxonomy: Record<string, TaxonomyType>;
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
