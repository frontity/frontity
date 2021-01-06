import { Package, AsyncAction, Derived } from "frontity/types";
import { Data } from "./data";
import {
  TermEntity,
  PostEntity,
  PageEntity,
  AttachmentEntity,
  AuthorEntity,
  TypeEntity,
  TaxonomyEntity,
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
   * The pathname part of the link, but without the pagination: `/page/X`.
   *
   * @deprecated In favor of `route`. To be removed in Source v2.
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
       * The url of the backend.
       */
      url: Derived<T extends null ? Source : T, string> | string;

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
       * @deprecated This function is no longer recommended. Please, use
       * entity's props from `state.source.get()` to access the state directly.
       *
       * @example
       * ```ts
       * const data = state.source.get("/some/post");
       * if (isPost(data)) {
       *   const post = state.source[data.type][data.id];
       * }
       * ```
       */
      entity: Derived<
        T extends null ? Source : T,
        (link: string) => Entity | null
      >;

      /**
       * The map of all {@link Data} objects, indexed by link.
       *
       * These data objects contain information about each resource that the
       * Frontity app fetched from the backend API using the
       * `actions.source.fetch()` action.
       *
       * @remarks
       * The proper way of getting data objects is using `state.source.get()`.
       */
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
      page: Record<string, PageEntity>;

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
       * An action that fetches all the information and entities related to a
       * link.
       *
       * It populates the state with both:
       * - An entry in `state.source.data` with information about that link.
       * - Normalized entities in relevant part of the state, like
       *   `state.source.post`, `state.source.category` or `state.source.author`
       *   and so on.
       *
       * @param link - The link that should be fetched. It can be a URL or a
       * custom link created to fetch additional entities from the REST API.
       * - URLs start with `/`.
       * - Non URLs start with `@`.
       * @example `actions.source.fetch("/some-post");`
       * @example `actions.source.fetch("@comments/135");`
       *
       * @param options - The options for this fetch. Defined by {@link
       * FetchOptions}.
       *
       * @returns A promise that resolves when the data fetching has finished.
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
