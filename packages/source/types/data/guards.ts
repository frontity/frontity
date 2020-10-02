import {
  Data,
  ErrorData,
  ArchiveData,
  SearchData,
  TaxonomyData,
  CategoryData,
  TagData,
  AuthorData,
  PostTypeArchiveData,
  PostArchiveData,
  DateData,
  PostTypeData,
  PostData,
  PageData,
  AttachmentData,
  CommentData,
} from "./";

/**
 * Checks if a data object represents an error.
 *
 * @param data - Object of type {@link Data}.
 * @returns A boolean value with the result.
 */
export function isError(data: Data): data is ErrorData {
  return (data as ErrorData).isError === true;
}
/**
 * Checks if a data object represents an archive.
 *
 * @param data - Object of type {@link Data}.
 * @returns A boolean value with the result.
 */
export function isArchive(data: Data): data is ArchiveData {
  return (data as ArchiveData).isArchive === true;
}

/**
 * Checks if a data object represents a search.
 *
 * @param data - Object of type {@link Data}.
 * @returns A boolean value with the result.
 */
export function isSearch(data: Data): data is SearchData {
  return (data as SearchData).isSearch === true;
}

/**
 * Checks if a data object represents a taxonomy.
 *
 * @param data - Object of type {@link Data}.
 * @returns A boolean value with the result.
 */
export function isTaxonomy(data: Data): data is TaxonomyData {
  return (data as TaxonomyData).isTaxonomy === true;
}

/**
 * Checks if a data object represents a category.
 *
 * @param data - Object of type {@link Data}.
 * @returns A boolean value with the result.
 */
export function isCategory(data: Data): data is CategoryData {
  return (data as CategoryData).isCategory === true;
}

/**
 * Checks if a data object represents a tag.
 *
 * @param data - Object of type {@link Data}.
 * @returns A boolean value with the result.
 */
export function isTag(data: Data): data is TagData {
  return (data as TagData).isTag === true;
}

/**
 * Checks if a data object represents an author archive.
 *
 * @param data - Object of type {@link Data}.
 * @returns A boolean value with the result.
 */
export function isAuthor(data: Data): data is AuthorData {
  return (data as AuthorData).isAuthor === true;
}

/**
 * Checks if a data object represents a date archive.
 *
 * @param data - Object of type {@link Data}.
 * @returns A boolean value with the result.
 */
export function isDate(data: Data): data is DateData {
  return (data as DateData).isDate === true;
}

/**
 * Checks if a data object represents a post type archive.
 *
 * @param data - Object of type {@link Data}.
 * @returns A boolean value with the result.
 */
export function isPostTypeArchive(data: Data): data is PostTypeArchiveData {
  return (data as PostTypeArchiveData).isPostTypeArchive === true;
}

/**
 * Checks if a data object represents a post archive.
 *
 * @param data - Object of type {@link Data}.
 * @returns A boolean value with the result.
 */
export function isPostArchive(data: Data): data is PostArchiveData {
  return (data as PostArchiveData).isPostArchive === true;
}

/**
 * Checks if a data object represents a post type entity.
 *
 * @param data - Object of type {@link Data}.
 * @returns A boolean value with the result.
 */
export function isPostType(data: Data): data is PostTypeData {
  return (data as PostTypeData).isPostType === true;
}

/**
 * Checks if a data object represents a post entity.
 *
 * @param data - Object of type {@link Data}.
 * @returns A boolean value with the result.
 */
export function isPost(data: Data): data is PostData {
  return (data as PostData).isPost === true;
}

/**
 * Checks if a data object represents a page entity.
 *
 * @param data - Object of type {@link Data}.
 * @returns A boolean value with the result.
 */
export function isPage(data: Data): data is PageData {
  return (data as PageData).isPage === true;
}

/**
 * Checks if a data object represents an attachment entity.
 *
 * @param data - Object of type {@link Data}.
 * @returns A boolean value with the result.
 */
export function isAttachment(data: Data): data is AttachmentData {
  return (data as AttachmentData).isAttachment === true;
}

/**
 * Checks if a data object represents a list of comments.
 *
 * @param data - Object of type {@link Data}.
 * @returns A boolean value with the result.
 */
export function isComments(data: Data): data is CommentData {
  return (data as CommentData).isComments === true;
}
