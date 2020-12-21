/**
 * Data related to a link in Frontity.
 *
 * These objects give information about data associated to a specific link in a
 * Frontity site. It contains the base properties of all interfaces that extend
 * `Data`.
 *
 * @example
 * ```
 * const data = {
 *   link: "/some/post/",
 *   route: "/some/post/",
 *   page: 1,
 *   query: {},
 *   isFetching: false,
 *   isReady: true,
 * }
 * ```
 */
export interface Data {
  /**
   * Link this data belongs to.
   */
  link: string;

  /**
   * Pathname part of the link, without the page part if the links points to an
   * archive page (like `/category/nature/page/2/`).
   */
  route: string;

  /**
   * Page number. It is always present, even for posts.
   *
   * @defaultValue 1
   */
  page: number;

  /**
   * The query part of the link, in object format.
   */
  query: Record<string, any>;

  /**
   * Boolean indicating if this link is being fetched.
   */
  isFetching: boolean;

  /**
   * Boolean indicating if this link is ready and entities related can be
   * consumed.
   */
  isReady: boolean;
}

/**
 * A link in Frontity that shows an error.
 *
 * @example
 * ```
 * const data = {
 *   link: "/not-a-post/",
 *   route: "/not-a-post/",
 *   page: 1,
 *   query: {},
 *   isFetching: false,
 *   isReady: true,
 *   isError: true,
 *   is404: true,
 *   errorStatus: 404,
 *   errorStatusText: "Not Found",
 * }
 * ```
 */
export interface ErrorData extends Data {
  /**
   * Property specifying that the link is an error.
   */
  isError: true;

  /**
   * HTTP error code.
   *
   * @example 404
   */
  errorStatus: number;

  /**
   * HTTP error message.
   *
   * @example "Not Found"
   */
  errorStatusText: string;

  /**
   * Link is ready when data is an error.
   */
  isReady: true;

  /**
   * Link is not being fetched when data is an error.
   */
  isFetching: false;

  // This is ugly but it seems like the best way.
  // Also types are erased at runtime so it doesnt add to bundle size.
  /* eslint-disable jsdoc/require-jsdoc */
  is400?: boolean;
  is401?: boolean;
  is402?: boolean;
  is403?: boolean;
  is404?: boolean;
  is405?: boolean;
  is406?: boolean;
  is407?: boolean;
  is408?: boolean;
  is409?: boolean;
  is410?: boolean;
  is411?: boolean;
  is412?: boolean;
  is413?: boolean;
  is414?: boolean;
  is415?: boolean;
  is416?: boolean;
  is417?: boolean;
  is500?: boolean;
  is501?: boolean;
  is502?: boolean;
  is503?: boolean;
  is504?: boolean;
  is505?: boolean;
  /* eslint-enable */
}

/**
 * A link in Frontity that shows a 404 error.
 *
 * @example
 * ```
 * const data = {
 *   link: "/not-a-post/",
 *   route: "/not-a-post/",
 *   page: 1,
 *   query: {},
 *   isFetching: false,
 *   isReady: true,
 *   isError: true,
 *   is404: true,
 *   errorStatus: 404,
 *   errorStatusText: "Not Found",
 * }
 * ```
 */
export interface Error404Data extends Data {
  /**
   * Property specifying that the link is an error.
   */
  isError: true;

  /**
   * HTTP 404 error code.
   */
  errorStatus: 404;

  /**
   * HTTP error message.
   *
   * @example "Not Found"
   */
  errorStatusText: string;

  /**
   * Link is ready when data is an error.
   */
  isReady: true;

  /**
   * Link is not being fetched when data is an error.
   */
  isFetching: false;

  /**
   * The 404 conditional tag.
   */
  is404: true;
}

// ARCHIVES

/**
 * Data that references a post type entity in the state.
 *
 * This kind of objects are included in an array called `items` present in
 * {@link ArchiveData} objects.
 */
export interface DataEntity {
  /**
   * Entity post type.
   */
  type: string;

  /**
   * Entity ID.
   */
  id: number;

  /**
   * Link where this entity is shown.
   */
  link: string;
}

/**
 * Data that references a post type entity in the state.
 *
 * @deprecated Use {@link DataEntity} instead.
 */
export type EntityData = DataEntity;

/**
 * Data for and archive, like the homepage, categories or tags, authors, date
 * archives, etc.
 */
export interface ArchiveData extends Data {
  /**
   * Property indicatig that the link is an archive.
   */
  isArchive: true;

  /**
   * List of items contained in this archive page.
   */
  items: DataEntity[];

  /**
   * The link to the next page if it exists.
   */
  next?: string;

  /**
   * The link to the previous page if it exists.
   */
  previous?: string;

  /**
   * Total number of post entities in the whole archive.
   */
  total?: number;

  /**
   * Total number of pages in the whole archive.
   */
  totalPages?: number;
}

/**
 * Data for a search in an archive.
 */
export interface SearchData extends ArchiveData {
  /**
   * Identify a search in an archive.
   */
  isSearch: true;

  /**
   * Search query in string format.
   */
  searchQuery: string;
}

/**
 * Data for a term page.
 */
export interface TermData extends ArchiveData {
  /**
   * Identify a term page.
   *
   * @deprecated Use `isTerm` instead.
   */
  isTaxonomy?: true;

  /**
   * Identify a term page.
   */
  isTerm: true;

  /**
   * Slug of the taxonomy this term belongs to.
   */
  taxonomy: string;

  /**
   * Term ID.
   */
  id: number;
}

/**
 * Data for a term page.
 *
 * @deprecated Use `TermData` instead.
 */
export type TaxonomyData = TermData;

/**
 * Data for a category page.
 */
export interface CategoryData extends TermData {
  /**
   * Slug of the taxonomy this term belongs to.
   */
  taxonomy: "category";

  /**
   * Identify a category page.
   */
  isCategory: true;
}

/**
 * Data for a category page.
 */
export interface TagData extends TermData {
  /**
   * Slug of the taxonomy this term belongs to.
   */
  taxonomy: "tag";

  /**
   * Identify a tag page.
   */
  isTag: true;
}

/**
 * Data for an author page.
 */
export interface AuthorData extends ArchiveData {
  /**
   * Identify an author page.
   */
  isAuthor: true;

  /**
   * Author ID.
   */
  id: number;
}

/**
 * Data for post type archive pages.
 */
export interface PostTypeArchiveData extends ArchiveData {
  /**
   * Identify a post type archive page.
   */
  isPostTypeArchive: true;

  /**
   * Post type slug.
   */
  type: string;
}

/**
 * Data for `post` archive pages.
 */
export interface PostArchiveData extends PostTypeArchiveData {
  /**
   * Identify a `post` archive page.
   */
  isPostArchive: true;
}

/**
 * Adds properties to `ArchiveData` to identify date archive pages.
 */
export interface DateData extends ArchiveData {
  /**
   * Identify a date archive page.
   */
  isDate: true;

  /**
   * The year number.
   */
  year: number;

  /**
   * The month number (from 1 to 12).
   */
  month?: number;

  /**
   * The day number.
   */
  day?: number;
}

// POST TYPES

/**
 * Data for a post type page.
 *
 * Post type entities are posts, pages, attachments, custom post types, etc.
 */
export interface PostTypeData extends Data {
  /**
   * Identify a post type page.
   */
  isPostType: true;

  /**
   * Post type slug.
   */
  type: string;

  /**
   * Entity ID.
   */
  id: number;
}

/**
 * Data for a post.
 */
export interface PostData extends PostTypeData {
  /**
   * Post type slug.
   */
  type: "post";

  /**
   * Identify a post.
   */
  isPost: true;
}

/**
 * Data for a page.
 */
export interface PageData extends PostTypeData {
  /**
   * Post type slug.
   */
  type: "page";

  /**
   * Identify a page.
   */
  isPage: true;
}

/**
 * Data for an attachment.
 */
export interface AttachmentData extends PostTypeData {
  /**
   * Post type slug.
   */
  type: "attachment";

  /**
   * Identify an attachment.
   */
  isAttachment: true;
}

/**
 * Data for the homepage.
 */
export interface HomeData extends Data {
  /**
   * Identify the homepage.
   */
  isHome: true;
}
