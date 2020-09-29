/* eslint-disable */

import { Package, AsyncAction, Derived } from "frontity/types";
import { Data } from "./types/data";
import {
  TaxonomyEntity,
  PostEntity,
  AttachmentEntity,
  AuthorEntity,
  TaxonomyType,
  PostType,
} from "./types/entities";

// Export directly some types.
export { Data, EntityData } from "./types/data";
export {
  TaxonomyEntity,
  PostEntity,
  AttachmentEntity,
  AuthorEntity,
  TaxonomyType,
  PostType,
} from "./types/entities";

export type RouteParams = {
  path?: string; // we should remove this when `path` is deprecated
  route?: string;
  page?: number;
  query?: Record<string, any>;
  hash?: string;
};

interface Source<T = null> extends Package {
  state: {
    source: {
      get: Derived<T extends null ? Source : T, (link: string) => Data>;

      /**
       * Return the entity pointed by the given link.
       *
       * If the entity is not found (because it has not been populated in the
       * state yet or because the link does not point to an entity, e.g. a date
       * archive or a 404 page) this derived prop returns `null`.
       *
       * @example state.source.entity("/2020/some-post");
       *
       * @param link - A link to a page of the Frontity site.
       * @returns The entity found or `null` otherwise.
       */
      entity: Derived<
        T extends null ? Source : T,
        <Entity = any>(link: string) => Entity
      >;

      /**
       * The URL of the REST API.
       *
       * It can be from a self-hosted WordPress or from a WordPress.com site.
       *
       * @example "https://your-site.com/wp-json"
       * @example "https://public-api.wordpress.com/wp/v2/sites/your-site.wordpress.com"
       */
      api: string;

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
      fetch:
        | AsyncAction<T extends null ? Source : T, string>
        | AsyncAction<T extends null ? Source : T, string, { force?: boolean }>;
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
