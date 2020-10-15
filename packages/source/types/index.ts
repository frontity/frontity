/* eslint-disable */

import { Package, AsyncAction, Derived } from "frontity/types";
import { Data } from "./data";
import {
  TaxonomyEntity,
  PostEntity,
  AttachmentEntity,
  AuthorEntity,
  TermEntity,
  TypeEntity,
  Entity,
} from "./entities";

// Export directly some types.
export * from "./data";
export * from "./entities";

/**
 * The Frontity params extracted from a link.
 */
export type LinkParams = {
  /**
   * DEPRECATED in favor of `route`. To be removed in Source v2.
   */
  path?: string;

  /**
   * The pathname part of the link, but without the pagination: `/page/X`.
   *
   * @example `/category/nature/page/3 -> /category/nature`
   */
  route?: string;

  /**
   * The page number, extracted from the pagination: `/page/X`.
   *
   * @example `/category/nature/page/3 -> 3`
   */
  page?: number;

  /**
   * The query, formatted as an object.
   *
   * @example `{ a: "v1", b: "v2" }`
   */
  query?: Record<string, any>;

  /**
   * The query, formatted as an string. The params are reordered
   * alphabetically.
   *
   * @example `?a=v1&b=v2`
   */
  queryString?: string;

  /**
   * The hash of the link.
   *
   * @example `#some-hash`
   */
  hash?: string;
};

/**
 * The options for the `actions.source.fetch()` action. Defined in {@link
 * Source}.
 */
interface FetchOptions {
  /**
   * By default, if the set of entities required for a link have been already
   * fetched, they are not fetched again. You can force a new re-fetch by
   * setting `force` to true.
   *
   * @defaultValue false
   */
  force?: boolean;
}

/**
 * Interface for all the Frontity Source packages.
 */
interface Source<T = null> extends Package {
  /**
   * The state that should be exposed by the Source packages.
   */
  state: {
    /**
     * The source namespace.
     */
    source: {
      /**
       * Return a data object from `state.source.data`. People should use this
       * derived state instead of accessing `state.source.data` directly
       * because it addresses some problems, like missing trailing slahes.
       *
       * @example `state.source.get("/some-post")`
       *
       * @param link - The link.
       *
       * @returns The data object corresponding to the provided link.
       */
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
      entity: Derived<T extends null ? Source : T, (link: string) => Entity>;

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

      /**
       * The map of category entities, indexed by ID.
       *
       * The entities have the shape returned by the WP REST API.
       */
      category: Record<string, TermEntity>;

      /**
       * The map of tag entities, indexed by ID.
       *
       * The entities have the shape returned by the WP REST API, expect that
       * `post_tag` is renamed to `tag`.
       */
      tag: Record<string, TermEntity>;

      /**
       * The map of post entities, indexed by ID.
       *
       * The entities have the shape returned by the WP REST API.
       */
      post: Record<string, PostEntity>;

      /**
       * The map of page entities, indexed by ID.
       *
       * The entities have the shape returned by the WP REST API.
       */
      page: Record<string, PostEntity>;

      /**
       * The map of author entities, indexed by ID.
       *
       * The entities have the shape returned by the WP REST API.
       */
      author: Record<string, AuthorEntity>;

      /**
       * The map of attachment entities, indexed by ID.
       *
       * The entities have the shape returned by the WP REST API.
       */
      attachment: Record<string, AttachmentEntity>;

      /**
       * The map of type entities, indexed by ID.
       *
       * The entities have the shape returned by the WP REST API.
       */
      type: Record<string, TypeEntity>;

      /**
       * The map of taxonomy entities, indexed by ID.
       *
       * The entities have the shape returned by the WP REST API.
       */
      taxonomy: Record<string, TaxonomyEntity>;
    };
  };

  /**
   * The actions that should be exposed by the Source packages.
   */
  actions: {
    /**
     * The source namespace.
     */
    source: {
      /**
       * Fetch a new set of entities from the source API, corresponding to all
       * the data needed for that link.
       *
       * @param link - The link.
       * @param options - The options for this fetch. Defined by {@link
       * FetchOptions}.
       *
       * @returns A promise that resolves once the fetch has finished.
       */
      fetch:
        | AsyncAction<T extends null ? Source : T, string>
        | AsyncAction<T extends null ? Source : T, string, FetchOptions>;
    };
  };

  /**
   * The libraries that should be exposed by the Source packages.
   */
  libraries: {
    /**
     * The source namespace.
     */
    source: {
      /**
       * Extract the Frontity link params from a link.
       *
       * @param link - The link.
       *
       * @returns The link params, defined by {@link LinkParams}.
       */
      parse: (link: string) => LinkParams;

      /**
       * Compose a link in string format out of some Frontity link params.
       *
       * @param linkParams - The link params, defined by {@link LinkParams}.
       *
       * @returns The link, in string format.
       */
      stringify: (linkParams: LinkParams) => string;

      /**
       * Normalize a link, making sure that multiple links that should point to
       * the same canonical link are processed as a single one.
       *
       * @example `/some-post -> /some-post/`
       *
       * @param link - The link to be normalized.
       *
       * @returns The normalized link.
       */
      normalize: (link: string) => string;
    };
  };
}

export default Source;
