/* eslint-disable */
import { CommentItem } from "../../wp-comments/types";

/**
 * This one is the return type of `libraries.source.populate`...
 */
export interface DataItem {
  type: string;
  id: number;
  link: string;
}

/**
 * @deprecated Use {@link DataItem} instead.
 */
export interface EntityData extends DataItem {}

/**
 * Type that represents objects stored in `state.source.data`.
 * These objects give information about data associated to a
 * given URL in a Frontity site.
 * It contains the base properties of all types that extend `Data`.
 */
export interface Data {
  link: string;
  query: object;
  isFetching: boolean;
  isReady: boolean;
  route?: string;
  page?: number;
}

// ERROR

/**
 * Adds new properties to `BaseData` to identify errors.
 *
 * @property {isError} true
 * @property {number} errorStatus
 * @property {string} errorStatusText
 */
export interface ErrorData extends Data {
  isError: true;
  errorStatus: number;
  errorStatusText: string;
  isReady: true;
  isFetching: false;

  // This is ugly but it seems like the best way.
  // Also types are erased at runtime so it doesnt add to bundle size
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
}

// ARCHIVES

/**
 * Adds properties to `BaseData` to identify archive pages.
 *
 * @property {true} isArchive
 * @property {DataItem[]} items - List of items contained in this archive page.
 * @property {number} page - The page number of this archive page.
 * @property {string} path - The path of this archive page without the page.
 * @property {string} next - The link to the next page if it exists.
 * @property {string} previous - The link to the previous page if it exists.
 * @property {number} total - Total number of post entities in the whole archive.
 * @property {number} total - Total number of pages in the whole archive.
 * @property {false} isSearch
 */
export interface ArchiveData extends Data {
  isArchive: true;
  items: DataItem[];
  route: string;
  page: number;
  next?: string;
  previous?: string;
  total?: number;
  totalPages?: number;
}

/**
 * Adds properties to identify archive pages with search.
 *
 * @property {true} isSearch
 * @property {string} searchQuery
 */
export interface SearchData extends Data {
  isSearch: true;
  searchQuery: string;
  route: string;
  page: number;
}

/**
 * Adds properties to `ArchiveData` to identify taxonomy pages.
 *
 * @property {true} isTerm
 * @property {string} taxonomy - Term taxonomy.
 * @property {number} id - Term id.
 */
export interface TermData extends ArchiveData {
  /**
   * @deprecated Use `isTerm` instead.
   */
  isTaxonomy?: true;
  isTerm: true;
  taxonomy: string;
  id: number;
}

/**
 * Adds properties to `TermData` to identify taxonomy with search pages.
 */
export interface TermWithSearchData extends TermData, SearchData {}

/**
 * @deprecated Use `TermData` instead.
 */
export type TaxonomyData = TermData;
/**
 * @deprecated Use `TermWithSearchData` instead.
 */
export type TaxonomyWithSearchData = TermWithSearchData;

/**
 * Adds properties to `TermData` to identify category pages.
 *
 * @property {true} isCategory
 * @property {"category"} taxonomy
 */
export interface CategoryData extends TermData {
  taxonomy: "category";
  isCategory: true;
}

/**
 * Adds properties to `CategoryData` to identify category with search pages.
 */
export interface CategoryWithSearchData extends CategoryData, SearchData {}

/**
 * Adds properties to `TermData` to identify tag pages.
 *
 * @property {true} isTag
 * @property {"tag"} taxonomy
 */
export interface TagData extends TermData {
  taxonomy: "tag";
  isTag: true;
}

/**
 * Adds properties to `TagData` to identify tag with search pages.
 */
export interface TagWithSearchData extends TagData, SearchData {}

/**
 * Adds properties to `ArchiveData` to identify author pages.
 *
 * @property {true} isAuthor
 * @property {number} id - Author id.
 */
export interface AuthorData extends ArchiveData {
  isAuthor: true;
  id: number;
}

/**
 * Adds properties to `AuthorData` to identify author with search pages.
 */
export interface AuthorWithSearchData extends AuthorData, SearchData {}

/**
 * Adds properties to `ArchiveData` to identify post type archive pages.
 *
 * @property {true} isPostTypeArchive
 * @property {string} type - Post type slug.
 */
export interface PostTypeArchiveData extends ArchiveData {
  isPostTypeArchive: true;
  type: string;
}

/**
 * Adds properties to `PostTypeArchiveData` to identify post type archives
 * with search pages.
 */
export interface PostTypeArchiveWithSearchData
  extends PostTypeArchiveData,
    SearchData {}

/**
 * Adds properties to `PostArchiveData` to identify `post` archive pages.
 *
 * @property {true} isPostArchive
 */
export interface PostArchiveData extends PostTypeArchiveData {
  isPostArchive: true;
}

/**
 * Adds properties to `PostArchiveData` to identify post archives
 * with search pages.
 */
export interface PostArchiveWithSearchData
  extends PostArchiveData,
    SearchData {}

/**
 * Adds properties to `ArchiveData` to identify date archive pages.
 *
 * @property {true} isDate
 * @property {number} year - The year number.
 * @property {number} month - The month number (from 1 to 12).
 * @property {number} day - The day number.
 */
export interface DateData extends ArchiveData {
  isDate: true;
  year: number;
  month?: number;
  day?: number;
}

/**
 * Adds properties to `DateData` to identify date with search pages.
 */
export interface DateWithSearchData extends DateData, SearchData {}

// POST TYPES

/**
 * Adds properties to `BaseData` to identify post type pages.
 * Post type entities are posts, pages, attachments, custom post types, etc.
 *
 * @property {true} isPostType
 * @property {string} type - Post type slug.
 * @property {number} id - Entity id.
 */
export interface PostTypeData extends Data {
  isPostType: true;
  type: string;
  id: number;
}

/**
 * Adds properties to `PostTypeData` to identify posts.
 *
 * @property {true} isPost
 * @property {"post"} type
 */
export interface PostData extends PostTypeData {
  type: "post";
  isPost: true;
}

/**
 * Adds properties to `PostTypeData` to identify pages.
 *
 * @property {true} isPage
 * @property {"page"} type
 */
export interface PageData extends PostTypeData {
  type: "page";
  isPage: true;
}

/**
 * Adds properties to `PostTypeData` to identify attachments.
 *
 * @property {true} isAttachment
 * @property {"attachment"} type
 */
export interface AttachmentData extends PostTypeData {
  type: "attachment";
  isAttachment: true;
}

/**
 * Adds properties to `Data` to identify the comments.
 */
export interface CommentData extends Data {
  postId: number;
  type: "comments";
  isComments: true;
  items: CommentItem[];
  total: number;
  totalPages: number;
}

/**
 * Interface for the homepage.
 */
export interface HomeData extends Data {
  isHome: true;
}
