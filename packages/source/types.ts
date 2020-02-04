import { Package, Action, Derived } from "frontity/types";
import { Data } from "./types/data";
import {
  TaxonomyEntity,
  PostEntity,
  AttachmentEntity,
  AuthorEntity,
  TaxonomyType,
  PostType
} from "./types/entities";

// Export directly some types.
export { Data, EntityData } from "./types/data";
export {
  TaxonomyEntity,
  PostEntity,
  AttachmentEntity,
  AuthorEntity,
  TaxonomyType,
  PostType
} from "./types/entities";

export type RouteParams = {
  path: string;
  page?: number;
  query?: Record<string, any>;
  hash?: string;
};

interface Source extends Package {
  state: {
    source: {
      get: Derived<Source, (link: string) => Data>;
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
      fetch: Action<Source, string>;
    };
  };
  libraries: {
    source: {
      parse: (route: string) => RouteParams;
      stringify: (routeParams: RouteParams) => string;
      normalize: (route: string) => string;
    };
  };
}

export default Source;
