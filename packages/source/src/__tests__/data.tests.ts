import { expectType } from "frontity/types/helpers";
import {
  // Types.
  Data,
  ErrorData,
  ArchiveData,
  TaxonomyData,
  TermData,
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
  SearchData,
  HomeData,
} from "../../types/data";
import {
  // Guards.
  isError,
  isArchive,
  isSearch,
  isTerm,
  isTaxonomy,
  isCategory,
  isTag,
  isAuthor,
  isDate,
  isPostTypeArchive,
  isPostArchive,
  isPostType,
  isPost,
  isPage,
  isAttachment,
  isHome,
} from "../data";
import {
  // Data instances.
  onlyStatus,
  notFound,
  term,
  category,
  tag,
  author,
  postTypeArchive,
  postArchive,
  dateArchive,
  termWithSearchData,
  categoryWithSearchData,
  tagWithSearchData,
  authorWithSearchData,
  postTypeArchiveWithSearchData,
  postArchiveWithSearchData,
  dateArchiveWithSearchData,
  postType,
  post,
  page,
  attachment,
  oldTaxonomy,
} from "../../__tests__/mocks/data";

describe("Data type guards", () => {
  // eslint-disable-next-line jest/expect-expect
  test("Types are well defined", () => {
    const data: Data = onlyStatus;

    if (isError(data)) {
      expectType<Data>(data);
      expectType<ErrorData>(data);
    }

    if (isArchive(data)) {
      expectType<Data>(data);
      expectType<ArchiveData>(data);
    }

    if (isTerm(data)) {
      expectType<Data>(data);
      expectType<ArchiveData>(data);
      expectType<TermData>(data);
      expectType<TaxonomyData>(data);
    }

    // Type composition nesting other checks.
    if (isTerm(data)) {
      if (isSearch(data)) {
        expectType<Data>(data);
        expectType<ArchiveData>(data);
        expectType<TermData>(data);
        expectType<TermData & SearchData>(data);
        expectType<TaxonomyData>(data);
        expectType<TaxonomyData & SearchData>(data);
      }
    }

    // Types can be composited in the same condition.
    if (isTerm(data) && isSearch(data)) {
      expectType<Data>(data);
      expectType<ArchiveData>(data);
      expectType<TermData>(data);
      expectType<TermData & SearchData>(data);
      expectType<TaxonomyData>(data);
      expectType<TaxonomyData & SearchData>(data);
    }

    if (isCategory(data)) {
      expectType<Data>(data);
      expectType<ArchiveData>(data);
      expectType<TermData>(data);
      expectType<TaxonomyData>(data);
      expectType<CategoryData>(data);
      if (isSearch(data)) expectType<CategoryData & SearchData>(data);
    }

    if (isTag(data)) {
      expectType<Data>(data);
      expectType<ArchiveData>(data);
      expectType<TermData>(data);
      expectType<TaxonomyData>(data);
      expectType<TagData>(data);
      if (isSearch(data)) expectType<TagData & SearchData>(data);
    }

    if (isAuthor(data)) {
      expectType<Data>(data);
      expectType<ArchiveData>(data);
      expectType<AuthorData>(data);
      if (isSearch(data)) expectType<AuthorData & SearchData>(data);
    }

    if (isPostTypeArchive(data)) {
      expectType<Data>(data);
      expectType<ArchiveData>(data);
      expectType<PostTypeArchiveData>(data);
      if (isSearch(data)) expectType<PostTypeArchiveData & SearchData>(data);
    }

    if (isPostArchive(data)) {
      expectType<Data>(data);
      expectType<ArchiveData>(data);
      expectType<PostTypeArchiveData>(data);
      expectType<PostArchiveData>(data);
      if (isSearch(data)) expectType<PostArchiveData & SearchData>(data);
      if (isHome(data)) expectType<PostArchiveData & HomeData>(data);
    }

    if (isDate(data)) {
      expectType<Data>(data);
      expectType<ArchiveData>(data);
      expectType<DateData>(data);
      if (isSearch(data)) expectType<DateData & SearchData>(data);
    }

    if (isPostType(data)) {
      expectType<Data>(data);
      expectType<PostTypeData>(data);
    }

    if (isPost(data)) {
      expectType<Data>(data);
      expectType<PostTypeData>(data);
      expectType<PostData>(data);
    }

    if (isPage(data)) {
      expectType<Data>(data);
      expectType<PostTypeData>(data);
      expectType<PageData>(data);
      if (isHome(data)) expectType<PageData & HomeData>(data);
    }

    if (isAttachment(data)) {
      expectType<Data>(data);
      expectType<PostTypeData>(data);
      expectType<AttachmentData>(data);
    }
  });

  test("`isError` should only recognize error data", () => {
    expect(isError(onlyStatus)).toBe(false);
    // Error.
    expect(isError(notFound)).toBe(true);
    // Terms.
    expect(isError(term)).toBe(false);
    expect(isError(termWithSearchData)).toBe(false);
    expect(isError(category)).toBe(false);
    expect(isError(categoryWithSearchData)).toBe(false);
    expect(isError(tag)).toBe(false);
    expect(isError(tagWithSearchData)).toBe(false);
    // Author
    expect(isError(author)).toBe(false);
    expect(isError(authorWithSearchData)).toBe(false);
    // Post Type archive
    expect(isError(postTypeArchive)).toBe(false);
    expect(isError(postTypeArchiveWithSearchData)).toBe(false);
    expect(isError(postArchive)).toBe(false);
    expect(isError(postArchiveWithSearchData)).toBe(false);
    // Date Archive
    expect(isError(dateArchive)).toBe(false);
    expect(isError(dateArchiveWithSearchData)).toBe(false);
    // Post Types.
    expect(isError(postType)).toBe(false);
    expect(isError(post)).toBe(false);
    expect(isError(page)).toBe(false);
    expect(isError(attachment)).toBe(false);
  });

  test("`isArchive` should recognize archive data", () => {
    expect(isArchive(onlyStatus)).toBe(false);
    // Error.
    expect(isArchive(notFound)).toBe(false);
    // Terms.
    expect(isArchive(term)).toBe(true);
    expect(isArchive(termWithSearchData)).toBe(true);
    expect(isArchive(category)).toBe(true);
    expect(isArchive(categoryWithSearchData)).toBe(true);
    expect(isArchive(tag)).toBe(true);
    expect(isArchive(tagWithSearchData)).toBe(true);
    // Author
    expect(isArchive(author)).toBe(true);
    expect(isArchive(authorWithSearchData)).toBe(true);
    // Post Type archive
    expect(isArchive(postTypeArchive)).toBe(true);
    expect(isArchive(postTypeArchiveWithSearchData)).toBe(true);
    expect(isArchive(postArchive)).toBe(true);
    expect(isArchive(postArchiveWithSearchData)).toBe(true);
    // Date Archive
    expect(isArchive(dateArchive)).toBe(true);
    expect(isArchive(dateArchiveWithSearchData)).toBe(true);
    // Post Types.
    expect(isArchive(postType)).toBe(false);
    expect(isArchive(post)).toBe(false);
    expect(isArchive(page)).toBe(false);
    expect(isArchive(attachment)).toBe(false);
  });

  test("`isTerm` should recognize term data", () => {
    expect(isTerm(onlyStatus)).toBe(false);
    // Error.
    expect(isTerm(notFound)).toBe(false);
    // Terms.
    expect(isTerm(term)).toBe(true);
    expect(isTerm(termWithSearchData)).toBe(true);
    expect(isTerm(category)).toBe(true);
    expect(isTerm(categoryWithSearchData)).toBe(true);
    expect(isTerm(tag)).toBe(true);
    expect(isTerm(tagWithSearchData)).toBe(true);
    // Deprecated Taxonomy
    expect(isTerm(oldTaxonomy)).toBe(true);
    // Author
    expect(isTerm(author)).toBe(false);
    expect(isTerm(authorWithSearchData)).toBe(false);
    // Post Type archive
    expect(isTerm(postTypeArchive)).toBe(false);
    expect(isTerm(postTypeArchiveWithSearchData)).toBe(false);
    expect(isTerm(postArchive)).toBe(false);
    expect(isTerm(postArchiveWithSearchData)).toBe(false);
    // Date Archive
    expect(isTerm(dateArchive)).toBe(false);
    expect(isTerm(dateArchiveWithSearchData)).toBe(false);
    // Post Types.
    expect(isTerm(postType)).toBe(false);
    expect(isTerm(post)).toBe(false);
    expect(isTerm(page)).toBe(false);
    expect(isTerm(attachment)).toBe(false);
  });

  test("`isTaxonomy` (deprecated) should recognize term data", () => {
    expect(isTaxonomy(onlyStatus)).toBe(false);
    // Error.
    expect(isTaxonomy(notFound)).toBe(false);
    // Terms.
    expect(isTaxonomy(term)).toBe(true);
    expect(isTaxonomy(termWithSearchData)).toBe(true);
    expect(isTaxonomy(category)).toBe(true);
    expect(isTaxonomy(categoryWithSearchData)).toBe(true);
    expect(isTaxonomy(tag)).toBe(true);
    expect(isTaxonomy(tagWithSearchData)).toBe(true);
    // Deprecated Taxonomy
    expect(isTaxonomy(oldTaxonomy)).toBe(true);
    // Author
    expect(isTaxonomy(author)).toBe(false);
    expect(isTaxonomy(authorWithSearchData)).toBe(false);
    // Post Type archive
    expect(isTaxonomy(postTypeArchive)).toBe(false);
    expect(isTaxonomy(postTypeArchiveWithSearchData)).toBe(false);
    expect(isTaxonomy(postArchive)).toBe(false);
    expect(isTaxonomy(postArchiveWithSearchData)).toBe(false);
    // Date Archive
    expect(isTaxonomy(dateArchive)).toBe(false);
    expect(isTaxonomy(dateArchiveWithSearchData)).toBe(false);
    // Post Types.
    expect(isTaxonomy(postType)).toBe(false);
    expect(isTaxonomy(post)).toBe(false);
    expect(isTaxonomy(page)).toBe(false);
    expect(isTaxonomy(attachment)).toBe(false);
  });

  test("`isCategory` should recognize category data", () => {
    expect(isCategory(onlyStatus)).toBe(false);
    // Error.
    expect(isCategory(notFound)).toBe(false);
    // Terms.
    expect(isCategory(term)).toBe(false);
    expect(isCategory(termWithSearchData)).toBe(false);
    expect(isCategory(category)).toBe(true);
    expect(isCategory(categoryWithSearchData)).toBe(true);
    expect(isCategory(tag)).toBe(false);
    expect(isCategory(tagWithSearchData)).toBe(false);
    // Deprecated Taxonomy
    expect(isCategory(oldTaxonomy)).toBe(false);
    // Author
    expect(isCategory(author)).toBe(false);
    expect(isCategory(authorWithSearchData)).toBe(false);
    // Post Type archive
    expect(isCategory(postTypeArchive)).toBe(false);
    expect(isCategory(postTypeArchiveWithSearchData)).toBe(false);
    expect(isCategory(postArchive)).toBe(false);
    expect(isCategory(postArchiveWithSearchData)).toBe(false);
    // Date Archive
    expect(isCategory(dateArchive)).toBe(false);
    expect(isCategory(dateArchiveWithSearchData)).toBe(false);
    // Post Types.
    expect(isCategory(postType)).toBe(false);
    expect(isCategory(post)).toBe(false);
    expect(isCategory(page)).toBe(false);
    expect(isCategory(attachment)).toBe(false);
  });

  test("`isTag` should recognize tag data", () => {
    expect(isTag(onlyStatus)).toBe(false);
    // Error.
    expect(isTag(notFound)).toBe(false);
    // Terms.
    expect(isTag(term)).toBe(false);
    expect(isTag(termWithSearchData)).toBe(false);
    expect(isTag(category)).toBe(false);
    expect(isTag(categoryWithSearchData)).toBe(false);
    expect(isTag(tag)).toBe(true);
    expect(isTag(tagWithSearchData)).toBe(true);
    // Deprecated Taxonomy
    expect(isTag(oldTaxonomy)).toBe(false);
    // Author
    expect(isTag(author)).toBe(false);
    expect(isTag(authorWithSearchData)).toBe(false);
    // Post Type archive
    expect(isTag(postTypeArchive)).toBe(false);
    expect(isTag(postTypeArchiveWithSearchData)).toBe(false);
    expect(isTag(postArchive)).toBe(false);
    expect(isTag(postArchiveWithSearchData)).toBe(false);
    // Date Archive
    expect(isTag(dateArchive)).toBe(false);
    expect(isTag(dateArchiveWithSearchData)).toBe(false);
    // Post Types.
    expect(isTag(postType)).toBe(false);
    expect(isTag(post)).toBe(false);
    expect(isTag(page)).toBe(false);
    expect(isTag(attachment)).toBe(false);
  });

  test("`isAuthor` should recognize author data", () => {
    expect(isAuthor(onlyStatus)).toBe(false);
    // Error.
    expect(isAuthor(notFound)).toBe(false);
    // Terms.
    expect(isAuthor(term)).toBe(false);
    expect(isAuthor(termWithSearchData)).toBe(false);
    expect(isAuthor(category)).toBe(false);
    expect(isAuthor(categoryWithSearchData)).toBe(false);
    expect(isAuthor(tag)).toBe(false);
    expect(isAuthor(tagWithSearchData)).toBe(false);
    // Deprecated Taxonomy
    expect(isAuthor(oldTaxonomy)).toBe(false);
    // Author
    expect(isAuthor(author)).toBe(true);
    expect(isAuthor(authorWithSearchData)).toBe(true);
    // Post Type archive
    expect(isAuthor(postTypeArchive)).toBe(false);
    expect(isAuthor(postTypeArchiveWithSearchData)).toBe(false);
    expect(isAuthor(postArchive)).toBe(false);
    expect(isAuthor(postArchiveWithSearchData)).toBe(false);
    // Date Archive
    expect(isAuthor(dateArchive)).toBe(false);
    expect(isAuthor(dateArchiveWithSearchData)).toBe(false);
    // Post Types.
    expect(isAuthor(postType)).toBe(false);
    expect(isAuthor(post)).toBe(false);
    expect(isAuthor(page)).toBe(false);
    expect(isAuthor(attachment)).toBe(false);
  });

  test("`isPostTypeArchive` should recognize post type archive data", () => {
    expect(isPostTypeArchive(onlyStatus)).toBe(false);
    // Error.
    expect(isPostTypeArchive(notFound)).toBe(false);
    // Terms.
    expect(isPostTypeArchive(term)).toBe(false);
    expect(isPostTypeArchive(termWithSearchData)).toBe(false);
    expect(isPostTypeArchive(category)).toBe(false);
    expect(isPostTypeArchive(categoryWithSearchData)).toBe(false);
    expect(isPostTypeArchive(tag)).toBe(false);
    expect(isPostTypeArchive(tagWithSearchData)).toBe(false);
    // Deprecated Taxonomy
    expect(isPostTypeArchive(oldTaxonomy)).toBe(false);
    // Author
    expect(isPostTypeArchive(author)).toBe(false);
    expect(isPostTypeArchive(authorWithSearchData)).toBe(false);
    // Post Type archive
    expect(isPostTypeArchive(postTypeArchive)).toBe(true);
    expect(isPostTypeArchive(postTypeArchiveWithSearchData)).toBe(true);
    expect(isPostTypeArchive(postArchive)).toBe(true);
    expect(isPostTypeArchive(postArchiveWithSearchData)).toBe(true);
    // Date Archive
    expect(isPostTypeArchive(dateArchive)).toBe(false);
    expect(isPostTypeArchive(dateArchiveWithSearchData)).toBe(false);
    // Post Types.
    expect(isPostTypeArchive(postType)).toBe(false);
    expect(isPostTypeArchive(post)).toBe(false);
    expect(isPostTypeArchive(page)).toBe(false);
    expect(isPostTypeArchive(attachment)).toBe(false);
  });

  test("`isPostArchive` should recognize post archive data", () => {
    expect(isPostArchive(onlyStatus)).toBe(false);
    // Error.
    expect(isPostArchive(notFound)).toBe(false);
    // Terms.
    expect(isPostArchive(term)).toBe(false);
    expect(isPostArchive(termWithSearchData)).toBe(false);
    expect(isPostArchive(category)).toBe(false);
    expect(isPostArchive(categoryWithSearchData)).toBe(false);
    expect(isPostArchive(tag)).toBe(false);
    expect(isPostArchive(tagWithSearchData)).toBe(false);
    // Deprecated Taxonomy
    expect(isPostArchive(oldTaxonomy)).toBe(false);
    // Author
    expect(isPostArchive(author)).toBe(false);
    expect(isPostArchive(authorWithSearchData)).toBe(false);
    // Post Type archive
    expect(isPostArchive(postTypeArchive)).toBe(false);
    expect(isPostArchive(postTypeArchiveWithSearchData)).toBe(false);
    expect(isPostArchive(postArchive)).toBe(true);
    expect(isPostArchive(postArchiveWithSearchData)).toBe(true);
    // Date Archive
    expect(isPostArchive(dateArchive)).toBe(false);
    expect(isPostArchive(dateArchiveWithSearchData)).toBe(false);
    // Post Types.
    expect(isPostArchive(postType)).toBe(false);
    expect(isPostArchive(post)).toBe(false);
    expect(isPostArchive(page)).toBe(false);
    expect(isPostArchive(attachment)).toBe(false);
  });

  test("`isDate` should recognize date archive data", () => {
    expect(isDate(onlyStatus)).toBe(false);
    // Error.
    expect(isDate(notFound)).toBe(false);
    // Terms.
    expect(isDate(term)).toBe(false);
    expect(isDate(termWithSearchData)).toBe(false);
    expect(isDate(category)).toBe(false);
    expect(isDate(categoryWithSearchData)).toBe(false);
    expect(isDate(tag)).toBe(false);
    expect(isDate(tagWithSearchData)).toBe(false);
    // Deprecated Taxonomy
    expect(isDate(oldTaxonomy)).toBe(false);
    // Author
    expect(isDate(author)).toBe(false);
    expect(isDate(authorWithSearchData)).toBe(false);
    // Post Type archive
    expect(isDate(postTypeArchive)).toBe(false);
    expect(isDate(postTypeArchiveWithSearchData)).toBe(false);
    expect(isDate(postArchive)).toBe(false);
    expect(isDate(postArchiveWithSearchData)).toBe(false);
    // Date Archive
    expect(isDate(dateArchive)).toBe(true);
    expect(isDate(dateArchiveWithSearchData)).toBe(true);
    // Post Types.
    expect(isDate(postType)).toBe(false);
    expect(isDate(post)).toBe(false);
    expect(isDate(page)).toBe(false);
    expect(isDate(attachment)).toBe(false);
  });

  test("`isSearch` should recognize search data", () => {
    expect(isSearch(onlyStatus)).toBe(false);
    // Error.
    expect(isSearch(notFound)).toBe(false);
    // Terms.
    expect(isSearch(term)).toBe(false);
    expect(isSearch(termWithSearchData)).toBe(true);
    expect(isSearch(category)).toBe(false);
    expect(isSearch(categoryWithSearchData)).toBe(true);
    expect(isSearch(tag)).toBe(false);
    expect(isSearch(tagWithSearchData)).toBe(true);
    // Deprecated Taxonomy
    expect(isSearch(oldTaxonomy)).toBe(false);
    // Author
    expect(isSearch(author)).toBe(false);
    expect(isSearch(authorWithSearchData)).toBe(true);
    // Post Type archive
    expect(isSearch(postTypeArchive)).toBe(false);
    expect(isSearch(postTypeArchiveWithSearchData)).toBe(true);
    expect(isSearch(postArchive)).toBe(false);
    expect(isSearch(postArchiveWithSearchData)).toBe(true);
    // Date Archive
    expect(isSearch(dateArchive)).toBe(false);
    expect(isSearch(dateArchiveWithSearchData)).toBe(true);
    // Post Types.
    expect(isSearch(postType)).toBe(false);
    expect(isSearch(post)).toBe(false);
    expect(isSearch(page)).toBe(false);
    expect(isSearch(attachment)).toBe(false);
  });

  test("`isPostType` should recognize post type data", () => {
    expect(isPostType(onlyStatus)).toBe(false);
    // Error.
    expect(isPostType(notFound)).toBe(false);
    // Terms.
    expect(isPostType(term)).toBe(false);
    expect(isPostType(termWithSearchData)).toBe(false);
    expect(isPostType(category)).toBe(false);
    expect(isPostType(categoryWithSearchData)).toBe(false);
    expect(isPostType(tag)).toBe(false);
    expect(isPostType(tagWithSearchData)).toBe(false);
    // Deprecated Taxonomy
    expect(isPostType(oldTaxonomy)).toBe(false);
    // Author
    expect(isPostType(author)).toBe(false);
    expect(isPostType(authorWithSearchData)).toBe(false);
    // Post Type archive
    expect(isPostType(postTypeArchive)).toBe(false);
    expect(isPostType(postTypeArchiveWithSearchData)).toBe(false);
    expect(isPostType(postArchive)).toBe(false);
    expect(isPostType(postArchiveWithSearchData)).toBe(false);
    // Date Archive
    expect(isPostType(dateArchive)).toBe(false);
    expect(isPostType(dateArchiveWithSearchData)).toBe(false);
    // Post Types.
    expect(isPostType(postType)).toBe(true);
    expect(isPostType(post)).toBe(true);
    expect(isPostType(page)).toBe(true);
    expect(isPostType(attachment)).toBe(true);
  });

  test("`isPost` should recognize post data", () => {
    expect(isPost(onlyStatus)).toBe(false);
    // Error.
    expect(isPost(notFound)).toBe(false);
    // Terms.
    expect(isPost(term)).toBe(false);
    expect(isPost(termWithSearchData)).toBe(false);
    expect(isPost(category)).toBe(false);
    expect(isPost(categoryWithSearchData)).toBe(false);
    expect(isPost(tag)).toBe(false);
    expect(isPost(tagWithSearchData)).toBe(false);
    // Deprecated Taxonomy
    expect(isPost(oldTaxonomy)).toBe(false);
    // Author
    expect(isPost(author)).toBe(false);
    expect(isPost(authorWithSearchData)).toBe(false);
    // Post Type archive
    expect(isPost(postTypeArchive)).toBe(false);
    expect(isPost(postTypeArchiveWithSearchData)).toBe(false);
    expect(isPost(postArchive)).toBe(false);
    expect(isPost(postArchiveWithSearchData)).toBe(false);
    // Date Archive
    expect(isPost(dateArchive)).toBe(false);
    expect(isPost(dateArchiveWithSearchData)).toBe(false);
    // Post Types.
    expect(isPost(postType)).toBe(false);
    expect(isPost(post)).toBe(true);
    expect(isPost(page)).toBe(false);
    expect(isPost(attachment)).toBe(false);
  });

  test("`isPage` should recognize page data", () => {
    expect(isPage(onlyStatus)).toBe(false);
    // Error.
    expect(isPage(notFound)).toBe(false);
    // Terms.
    expect(isPage(term)).toBe(false);
    expect(isPage(termWithSearchData)).toBe(false);
    expect(isPage(category)).toBe(false);
    expect(isPage(categoryWithSearchData)).toBe(false);
    expect(isPage(tag)).toBe(false);
    expect(isPage(tagWithSearchData)).toBe(false);
    // Deprecated Taxonomy
    expect(isPage(oldTaxonomy)).toBe(false);
    // Author
    expect(isPage(author)).toBe(false);
    expect(isPage(authorWithSearchData)).toBe(false);
    // Post Type archive
    expect(isPage(postTypeArchive)).toBe(false);
    expect(isPage(postTypeArchiveWithSearchData)).toBe(false);
    expect(isPage(postArchive)).toBe(false);
    expect(isPage(postArchiveWithSearchData)).toBe(false);
    // Date Archive
    expect(isPage(dateArchive)).toBe(false);
    expect(isPage(dateArchiveWithSearchData)).toBe(false);
    // Post Types.
    expect(isPage(postType)).toBe(false);
    expect(isPage(post)).toBe(false);
    expect(isPage(page)).toBe(true);
    expect(isPage(attachment)).toBe(false);
  });

  test("`isAttachment` should recognize attachment data", () => {
    expect(isAttachment(onlyStatus)).toBe(false);
    // Error.
    expect(isAttachment(notFound)).toBe(false);
    // Terms.
    expect(isAttachment(term)).toBe(false);
    expect(isAttachment(termWithSearchData)).toBe(false);
    expect(isAttachment(category)).toBe(false);
    expect(isAttachment(categoryWithSearchData)).toBe(false);
    expect(isAttachment(tag)).toBe(false);
    expect(isAttachment(tagWithSearchData)).toBe(false);
    // Deprecated Taxonomy
    expect(isAttachment(oldTaxonomy)).toBe(false);
    // Author
    expect(isAttachment(author)).toBe(false);
    expect(isAttachment(authorWithSearchData)).toBe(false);
    // Post Type archive
    expect(isAttachment(postTypeArchive)).toBe(false);
    expect(isAttachment(postTypeArchiveWithSearchData)).toBe(false);
    expect(isAttachment(postArchive)).toBe(false);
    expect(isAttachment(postArchiveWithSearchData)).toBe(false);
    // Date Archive
    expect(isAttachment(dateArchive)).toBe(false);
    expect(isAttachment(dateArchiveWithSearchData)).toBe(false);
    // Post Types.
    expect(isAttachment(postType)).toBe(false);
    expect(isAttachment(post)).toBe(false);
    expect(isAttachment(page)).toBe(false);
    expect(isAttachment(attachment)).toBe(true);
  });

  test("`isHome` should recognize the home data", () => {
    expect(isHome(onlyStatus)).toBe(false);
    // Error.
    expect(isHome(notFound)).toBe(false);
    // Terms.
    expect(isHome(term)).toBe(false);
    expect(isHome(termWithSearchData)).toBe(false);
    expect(isHome(category)).toBe(false);
    expect(isHome(categoryWithSearchData)).toBe(false);
    expect(isHome(tag)).toBe(false);
    expect(isHome(tagWithSearchData)).toBe(false);
    // Deprecated Taxonomy
    expect(isHome(oldTaxonomy)).toBe(false);
    // Author
    expect(isHome(author)).toBe(false);
    expect(isHome(authorWithSearchData)).toBe(false);
    // Post Type archive
    expect(isHome(postTypeArchive)).toBe(false);
    expect(isHome(postTypeArchiveWithSearchData)).toBe(false);
    expect(isHome(postArchive)).toBe(true);
    expect(isHome(postArchiveWithSearchData)).toBe(true);
    // Date Archive
    expect(isHome(dateArchive)).toBe(false);
    expect(isHome(dateArchiveWithSearchData)).toBe(false);
    // Post Types.
    expect(isHome(postType)).toBe(false);
    expect(isHome(post)).toBe(false);
    expect(isHome(page)).toBe(false);
    expect(isHome(attachment)).toBe(false);
  });
});
